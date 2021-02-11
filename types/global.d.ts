type NavigationCategories = 'Overview' | 'Components'

interface FrontMatter {
  __resourcePath: string
  category: NavigationCategories
  title: string
  id: string
}

declare module '*.mdx' {
  let MDXComponent: () => JSX.Element
  export default MDXComponent
  export const frontMatter: FrontMatter[]
}
