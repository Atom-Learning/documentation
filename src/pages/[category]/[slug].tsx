import { Flex, Heading, Text } from '@atom-learning/components'
import { GetStaticPaths, GetStaticProps } from 'next'
import { MdxRemote } from 'next-mdx-remote/types'
import * as React from 'react'

import { Main, Navigation, PropsTable } from '../../components'
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
      <Heading as="h1" size="lg" css={{ mb: '$4' }}>
        {data.title}
      </Heading>
      {data.description && (
        <Text size="lg" css={{ mb: '$3' }}>
          {data.description}
        </Text>
      )}
      {stringToMdx(content)}
      {data.component && <PropsTable for={data.component} />}
    </Main>
  </Flex>
)

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const pages = await getPages(['title', 'source', 'id', 'category'])
  const page = getPageBySlug(params.slug, params.category)
  const content = await mdxToString(page.content)

  return {
    props: {
      pages,
      data: page.data,
      content
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const pages = await getPages(['source', 'id'])
  const flattenedPages = pages.flatMap((source) => source[1])

  return {
    paths: flattenedPages.map(({ source, id }) => ({
      params: {
        category: source,
        slug: id
      }
    })),
    fallback: false
  }
}

export default Page
