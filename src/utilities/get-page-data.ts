import fs from 'fs'
import glob from 'glob'
import matter from 'gray-matter'
import path from 'path'

const getPagesSource = (source) => {
  if (source === 'components') {
    return path.join(
      'node_modules',
      '@atom-learning',
      'components',
      'dist',
      'docs'
    )
  }

  if (source === 'theme') {
    return path.join('node_modules', '@atom-learning', 'theme', 'dist')
  }

  if (source === 'overview') {
    return 'content'
  }
  return null
}

export const getPagesSlugs = async (sources: string[]) => {
  const pageSlugs = await Promise.all(
    sources.map((source) =>
      glob.sync(path.join(getPagesSource(source), '**/*.{md,mdx}'))
    )
  )
  const slugsBySource = sources.reduce(
    (obj, source, i) => ({ ...obj, [source]: pageSlugs[i] }),
    {}
  )

  return slugsBySource
}

const getMarkdownFile = (basePath, name) => {
  const fileAsMdx = path.join(basePath, `${name}.mdx`)
  const fileAsMd = path.join(basePath, `${name}.md`)
  const fileToRead = fs.existsSync(fileAsMdx) ? fileAsMdx : fileAsMd

  return fs.readFileSync(fileToRead, 'utf8')
}

export const getPageBySlug = (slug, source) => {
  const id = path.basename(slug, path.extname(slug)).toLowerCase()
  const file = getMarkdownFile(getPagesSource(source), id)

  const { data, content } = matter(file)

  return {
    data: {
      ...data,
      slug,
      id,
      category: source
    },
    content
  }
}

export const getPages = async () => {
  const sources = ['components', 'theme', 'overview']
  const slugs = await getPagesSlugs(sources)

  const pages = sources.map((source) => [
    source,
    slugs[source].map((slug: string) => getPageBySlug(slug, source))
  ])

  return pages
}
