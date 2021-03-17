import { Flex, Heading, Text } from '@atom-learning/components'
import { GetStaticPaths, GetStaticProps } from 'next'
import { MdxRemote } from 'next-mdx-remote/types'
import * as React from 'react'

import { Main, Navigation, Pagination, PropsTable } from '../../components'
import {
  getPageBySlug,
  getPages,
  mdxToString,
  stringToMdx,
  transformNavigationStructure
} from '../../utilities'

type PageProps = {
  data: {
    component?: string
    description?: string
    title: string
    id: string
  }
  content: MdxRemote.Source
  pages: {
    [key: string]: []
  }
  orderedPages: []
}

const Page: React.FC<PageProps> = ({ pages, orderedPages, content, data }) => (
  <Flex>
    <Navigation items={pages} />
    <Main>
      <Heading as="h1" size="lg" css={{ mb: '$5' }}>
        {data.title}
      </Heading>
      {data.description && (
        <Text size="lg" css={{ mb: '$4' }}>
          {data.description}
        </Text>
      )}
      {stringToMdx(content)}
      {data.component && <PropsTable for={data.component} />}
      <Pagination orderedPages={orderedPages} currentPage={data.id} />
    </Main>
  </Flex>
)

type Pages = [string, { category: string }[]][]

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const pages = (await getPages([
    'title',
    'source',
    'id',
    'category',
    'priority'
  ])) as Pages

  const transformedPages = transformNavigationStructure(pages)
  const orderedPages = Object.keys(transformedPages).reduce(
    (arr, source) => [
      ...arr,
      ...Object.keys(transformedPages[source])
        .filter((category) => category !== 'void')
        .map((category) => transformedPages[source][category])
        .flat()
    ],
    []
  )

  const page = getPageBySlug(params.slug, params.category)
  const content = await mdxToString(page.content)

  return {
    props: {
      pages: transformedPages,
      orderedPages,
      data: page.data,
      content
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const pages = await getPages(['source', 'id', 'priority'])
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
