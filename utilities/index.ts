import { frontMatter } from '../pages/**/*.mdx'

const pages: FrontMatter[] = frontMatter

export const getPages = (): Array<[string, FrontMatter[]]> => {
  // use Map to ensure consistent order in navigation
  const nav = new Map([
    ['Overview', []],
    ['Components', []]
  ])
  // save each page into its category
  pages.forEach((page) =>
    nav.set(page.category, [...(nav.get(page.category) || []), page])
  )
  // return array to enable React compatibility
  return Array.from(nav.entries())
}
