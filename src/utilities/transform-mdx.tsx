import * as Components from '@atom-learning/components'
import { Heading, Link, Text } from '@atom-learning/components'
import hydrate from 'next-mdx-remote/hydrate'
import renderToString from 'next-mdx-remote/render-to-string'
import { MdxRemote } from 'next-mdx-remote/types'
import * as React from 'react'

import { CodeBlock, Divider, InlineCode } from '../components'

const components: MdxRemote.Components = {
  h2: (props) => (
    <Heading
      {...props}
      as="h2"
      css={{
        mt: '$4',
        mb: '$3'
      }}
    />
  ),
  h3: (props) => (
    <Heading
      {...props}
      as="h3"
      size="sm"
      css={{
        mt: '$3',
        mb: '$2'
      }}
    />
  ),
  p: (props) => (
    <Text
      {...props}
      css={{
        mb: '$3',
        lineHeight: 1.6
      }}
    />
  ),
  ul: (props) => (
    <Text
      {...props}
      as="ul"
      css={{
        mb: '$3'
      }}
    />
  ),
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
