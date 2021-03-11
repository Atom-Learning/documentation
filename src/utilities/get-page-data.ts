import fs from 'fs'
import glob from 'glob'
import matter from 'gray-matter'
import { paramCase } from 'param-case'
import { pascalCase } from 'pascal-case'
import path from 'path'

import { trueCasePathSync } from './true-case-path'

const getPagesSource = (source) => {
  console.log({
    source,
    __dirname,
    cwd: process.cwd(),
    components: path.resolve(
      process.cwd(),
      'node_modules',
      '@atom-learning',
      'components',
      'dist',
      'docs'
    )
  })

  if (source === 'components') {
    return path.resolve(
      process.cwd(),
      'node_modules',
      '@atom-learning',
      'components',
      'dist',
      'docs'
    )
  }

  if (source === 'theme') {
    return path.resolve(
      process.cwd(),
      'node_modules',
      '@atom-learning',
      'theme',
      'dist'
    )
  }

  if (source === 'overview') {
    return path.resolve(process.cwd(), 'content')
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
  // const filePathAsMdx = path.join(basePath, `${pascalCase(name)}.mdx`)

  try {
    const file = trueCasePathSync(`${pascalCase(name)}.mdx`, basePath)
    return fs.readFileSync(file, 'utf8')
  } catch (err) {
    console.log(err)
  }

  try {
    const file = trueCasePathSync(`${pascalCase(name)}.md`, basePath)
    return fs.readFileSync(file, 'utf8')
  } catch (err) {
    console.log(err)
  }

  // const fileToRead = fs.existsSync(filePathAsMdx)
  //   ? `${pascalCase(name)}.mdx`
  //   : `${pascalCase(name)}.md`

  // console.log({ filePathAsMdx, trueCasePath: trueCasePathSync(fileToRead, basePath) })

  // return fs.readFileSync(trueCasePathSync(fileToRead, basePath), 'utf8')
}

export interface PageBySlug {
  data: {
    title?: string
    component?: string
    category?: string
    slug: string
    id: string
    source: 'components' | 'theme' | 'overview'
  }
  content: string
}

export const getPageBySlug = (slug, source): PageBySlug => {
  const id = paramCase(path.basename(slug, path.extname(slug)))
  const file = getMarkdownFile(getPagesSource(source), id)

  const { data, content } = matter(file)

  return {
    data: { ...data, slug, id, source },
    content
  }
}

export const getPages = async (fields?: string[]) => {
  const sources = ['overview', 'theme', 'components']
  const slugs = await getPagesSlugs(sources)

  const pages = sources.map((source: 'components' | 'theme' | 'overview') => [
    source,
    slugs[source]
      .map((slug: string) => getPageBySlug(slug, source))
      .map((page) => {
        const items = {}
        if (!fields) return page

        fields.forEach((field) => {
          if (field == 'slug') {
            items[field] = page.slug
          }
          if (field == 'content') {
            items[field] = page.content
          }
          if (page.data[field]) {
            items[field] = page.data[field]
          }
        })
        return items
      })
  ])

  return pages
}
