import path from 'path'
import * as React from 'react'

import { Flex, Main, Navigation } from '../components'
import { getPageBySlug, getPages, mdxToString, stringToMdx } from '../utilities'

type PageProps = {
  pages: []
  page: any
}

const Page: React.FC<PageProps> = ({}) => <div>Hello</div>

// export const getStaticProps = async ({ params }) => {
//   // const pathToFile =
//   //   params.category === 'components'
//   //     ? path.join(
//   //         'node_modules',
//   //         '@atom-learning',
//   //         'components',
//   //         'src',
//   //         'components',
//   //         params.slug
//   //       )
//   //     : path.join('node_modules', '@atom-learning', 'theme', 'src', params.slug)

//   const pages = await getPages()

//   const page = getPageBySlug(params?.slug, params?.category)
//   // const content = await mdxToString(page.content || '')

//   console.log({ page })
//   return {
//     props: { pages }
//   }
// }

// export const getStaticPaths = async () => {
//   const { components } = await getAllPages()

//   return {
//     paths: components.map(({ category, id }) => ({
//       params: {
//         category,
//         slug: id
//       }
//     })),
//     fallback: false
//   }
// }

export default Page
