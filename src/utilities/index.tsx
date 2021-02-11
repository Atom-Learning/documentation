import * as Components from '@atom-learning/components'
import fs from 'fs'
import glob from 'glob'
import matter from 'gray-matter'
import hydrate from 'next-mdx-remote/hydrate'
import renderToString from 'next-mdx-remote/render-to-string'
import { MdxRemote } from 'next-mdx-remote/types'
import path from 'path'

const components: MdxRemote.Components = Components

const source = {
  components: path.join(
    'node_modules',
    '@atom-learning',
    'components',
    'src',
    'components'
  )
  // theme: path.join('node_modules', '@atom-learning', 'theme', 'src')
}

export const getSlugs = async () => {
  const components = await glob.sync(path.join(source.components, '**/*.mdx'))
  // const theme = await glob.sync(path.join(source.theme, '**/*.mdx'))

  return {
    components: components.map((d) => ({
      id: path.basename(d, '.mdx'),
      path: path.dirname(d)
    }))
    // theme: theme.map((d) => ({
    //   id: path.basename(d, '.mdx'),
    //   path: path.dirname(d)
    // }))
  }
}

export const getPageBySlug = (page) => {
  const filePath = path.join(page.path, `${page.id}.mdx`)
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)

  return { data, content, path: page.path, id: page.id }
}

export const getAllPages = async () => {
  const { components } = await getSlugs()

  // console.log({ components })

  return {
    components: components.map((page) => ({
      ...getPageBySlug(page),
      category: 'components'
    }))
    // theme: theme.map((page) => ({
    //   ...getPageBySlug(page),
    //   category: 'theme'
    // }))
  }
}

export const mdxToString = async (mdx) => {
  return await renderToString(mdx, { components })
}

export const stringToMdx = (string) => {
  return hydrate(string, { components })
}
