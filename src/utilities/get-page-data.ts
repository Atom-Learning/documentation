import fs from 'fs'
import glob from 'glob'
import matter from 'gray-matter'
import path from 'path'

const getPagesSource = (category) => {
  if (category === 'components')
    return path.join(
      'node_modules',
      '@atom-learning',
      'components',
      'dist',
      'docs'
    )
  return null
}

export const getPagesSlugs = async (categories: string[]) => {
  const pageSlugs = await Promise.all(
    categories.map((category) =>
      glob.sync(path.join(getPagesSource(category), '**/*.{md,mdx}'))
    )
  )

  return categories.reduce((obj, curr, i) => {
    obj[curr] = pageSlugs[i]
    return obj
  }, {})
}

export const getPageBySlug = (slug: string, category: string) => {
  const basePath = getPagesSource(category)
  const id = path.basename(slug, path.extname(slug)).toLowerCase()

  const filePathMdx = path.join(basePath, `${id}.mdx`)
  const filePathMd = path.join(basePath, `${id}.md`)

  const isMdx = fs.existsSync(filePathMdx)

  const file = isMdx
    ? fs.readFileSync(filePathMdx, 'utf8')
    : fs.readFileSync(filePathMd, 'utf8')

  const contents = matter(file)

  return { ...contents, slug, id, category }
}

export const getPages = async () => {
  const categories = ['components']
  const slugs = await getPagesSlugs(categories)

  const pages = categories.map((category) => [
    category,
    slugs[category].map((slug) => getPageBySlug(slug, category))
  ])

  return pages
}
