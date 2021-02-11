import path from 'path'
import * as React from 'react'

import { Flex } from '../../components'
import { Main, Navigation } from '../../components/layout'
import {
  getAllPages,
  getPageBySlug,
  mdxToString,
  stringToMdx
} from '../../utilities'

type PageProps = {
  pages: []
  page: any
}

const Page: React.FC<PageProps> = ({ pages, page }) => (
  <Flex>
    <Navigation items={Object.entries(pages)} />
    <Main>{stringToMdx(page.content)}</Main>
  </Flex>
)

export const getStaticProps = async ({ params }) => {
  const pathToFile =
    params.category === 'components'
      ? path.join(
          'node_modules',
          '@atom-learning',
          'components',
          'src',
          'components',
          params.slug
        )
      : path.join('node_modules', '@atom-learning', 'theme', 'src', params.slug)

  const pages = await getAllPages()
  const page = getPageBySlug({
    path: pathToFile,
    id: params.slug
  })
  const content = await mdxToString(page.content || '')

  return {
    props: {
      pages,
      page: {
        ...page,
        content
      }
    }
  }
}

export const getStaticPaths = async () => {
  const { components } = await getAllPages()

  return {
    paths: components.map(({ category, id }) => ({
      params: {
        category,
        slug: id
      }
    })),
    fallback: false
  }
}

export default Page
