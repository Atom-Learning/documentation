import path from 'path'
import * as React from 'react'

import { Main, Navigation } from '../../components/layout'
import {
  getAllPages,
  getPageBySlug,
  mdxToString,
  stringToMdx
} from '../../utilities'

const Page = ({ post }) => {
  return stringToMdx(post.content)
}

export default Page

export async function getStaticProps({ params }) {
  const thing =
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

  const post = getPageBySlug({
    path: thing,
    id: params.slug
  })
  const content = await mdxToString(post.content || '')

  return {
    props: {
      post: {
        ...post,
        content
      }
    }
  }
}

export async function getStaticPaths() {
  const { components } = await getAllPages()

  return {
    paths: [...components].map((post) => {
      console.log({ post })
      return {
        params: {
          category: post.category,
          slug: post.id
        }
      }
    }),
    fallback: false
  }
}
