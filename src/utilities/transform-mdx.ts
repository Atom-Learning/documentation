import * as Components from '@atom-learning/components'
import hydrate from 'next-mdx-remote/hydrate'
import renderToString from 'next-mdx-remote/render-to-string'
import { MdxRemote } from 'next-mdx-remote/types'

const components: MdxRemote.Components = Components

export const mdxToString = async (mdx: string): Promise<MdxRemote.Source> => {
  return await renderToString(mdx, { components })
}

export const stringToMdx = (string: MdxRemote.Source): React.ReactNode => {
  return hydrate(string, { components })
}
