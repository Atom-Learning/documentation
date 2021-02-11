import * as React from 'react'

import { Flex, Main, Navigation } from '../../components'
import {
  getPageBySlug,
  getPages,
  mdxToString,
  stringToMdx
} from '../../utilities'

type PageProps = {
  pages: []
  content: any
}

const Page: React.FC<PageProps> = ({ pages, content }) => (
  <Flex>
    <Navigation items={pages} />
    <Main>{stringToMdx(content)}</Main>
  </Flex>
)

export const getStaticProps = async ({ params }) => {
  const pages = await getPages()
  const page = getPageBySlug(params?.slug, params?.category)
  const content = await mdxToString(page.content || '')

  // console.log({ pages })

  return {
    props: {
      pages,
      ...page.data,
      content
    }
  }
}

export const getStaticPaths = async () => {
  const pages = await getPages()
  const flattenedPages = pages.flatMap((category) => category[1])

  return {
    paths: flattenedPages.map(({ category, id }) => ({
      params: {
        category,
        slug: id
      }
    })),
    fallback: false
  }
}

export default Page
