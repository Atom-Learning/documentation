import { GetStaticPaths, GetStaticProps } from 'next'
import { MdxRemote } from 'next-mdx-remote/types'
import * as React from 'react'

import { Flex, Main, Navigation, PropsTable, Text } from '../../components'
import {
  getPageBySlug,
  getPages,
  mdxToString,
  stringToMdx
} from '../../utilities'

type PageProps = {
  component?: string
  title: string
  content: MdxRemote.Source
  pages: []
}

const Page: React.FC<PageProps> = ({ pages, content, title, component }) => (
  <Flex>
    <Navigation items={pages} />
    <Main>
      <Text as="h1" size="xxl">
        {title}
      </Text>
      {stringToMdx(content)}
      {component && <PropsTable for={component} />}
    </Main>
  </Flex>
)

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const pages = await getPages()
  const page = getPageBySlug(params.slug, params.category)
  const content = await mdxToString(page.content)

  return {
    props: {
      pages,
      ...page.data,
      content
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const pages = await getPages()
  const flattenedPages = pages.flatMap((source) => source[1])

  return {
    paths: flattenedPages.map(({ data }) => ({
      params: {
        category: data.category,
        slug: data.id
      }
    })),
    fallback: false
  }
}

export default Page
