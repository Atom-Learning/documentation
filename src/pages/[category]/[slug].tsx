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
  data: {
    component?: string
    description?: string
    title: string
  }
  content: MdxRemote.Source
  pages: []
}

const Page: React.FC<PageProps> = ({ pages, content, data }) => (
  <Flex>
    <Navigation items={pages} />
    <Main>
      <Text as="h1" size="xxl">
        {data.title}
      </Text>
      <Text size="lg">{data.description}</Text>
      {stringToMdx(content)}
      {data.component && <PropsTable for={data.component} />}
    </Main>
  </Flex>
)

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const pages = await getPages(['title', 'source', 'id', 'category'])
  const page = getPageBySlug(params.slug, params.category)
  const content = await mdxToString(page.content)
  // console.log(JSON.stringify(pages, null, 2))
  return {
    props: {
      pages,
      data: page.data,
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
        category: data.source,
        slug: data.id
      }
    })),
    fallback: false
  }
}

export default Page
