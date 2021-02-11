import { frontMatter } from '../pages/**/*.mdx'

const pages: FrontMatter[] = frontMatter
const categories: NavigationCategories[] = ['Overview', 'Components']

export const getPages = (): Array<[NavigationCategories, FrontMatter[]]> => {
  // use Map to ensure consistent order in navigation
  const nav = new Map<NavigationCategories, FrontMatter[]>(
    categories.map((category) => [category, []])
  )
  // save each page into its category
  pages.forEach((page) =>
    nav.set(page.category, [...(nav.get(page.category) || []), page])
  )
  // return array for React compatibility
  return Array.from(nav.entries())
}
