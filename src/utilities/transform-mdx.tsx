import * as Components from '@atom-learning/components'
import hydrate from 'next-mdx-remote/hydrate'
import renderToString from 'next-mdx-remote/render-to-string'
import { MdxRemote } from 'next-mdx-remote/types'
import * as React from 'react'

import { CodeBlock, Divider, InlineCode, Link, List, Text } from '../components'

const components: MdxRemote.Components = {
  h2: (props) => <Text {...props} size="lg" as="h2" />,
  h3: (props) => <Text {...props} css={{ fontWeight: 600 }} as="h3" />,
  p: Text,
  ul: List,
  inlineCode: InlineCode,
  a: Link,
  code: CodeBlock,
  hr: Divider,
  // spread @atom-learning/components to enable usage within react-live
  ...Components
}

export const mdxToString = async (mdx = ''): Promise<MdxRemote.Source> => {
  return await renderToString(mdx, { components })
}

export const stringToMdx = (string: MdxRemote.Source): React.ReactNode => {
  return hydrate(string, { components })
}
