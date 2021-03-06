import {
  Box,
  Divider,
  Heading,
  Link,
  List,
  Text
} from '@atom-learning/components'
import theme from '@atom-learning/theme'
import hydrate from 'next-mdx-remote/hydrate'
import renderToString from 'next-mdx-remote/render-to-string'
import { MdxRemote } from 'next-mdx-remote/types'
import * as React from 'react'

import {
  Cell,
  CodeBlock,
  ColorPalette,
  IconTable,
  InlineCode,
  Scale,
  Table
} from '../components'

const components: MdxRemote.Components = {
  h2: (props) => <Heading {...props} as="h2" css={{ mt: '$5', mb: '$4' }} />,
  h3: (props) => <Heading {...props} as="h3" size="sm" css={{ my: '$4' }} />,
  h4: (props) => (
    <Heading {...props} as="h4" size="xs" css={{ mt: '$4', mb: '$3' }} />
  ),
  p: (props) => <Text {...props} css={{ mb: '$4' }} />,
  ul: (props) => <List {...props} css={{ mb: '$4' }} />,
  li: List.Item,
  inlineCode: InlineCode,
  blockquote: (props) => (
    <Text
      {...props}
      as="blockquote"
      css={{ pl: '$4', my: '$4', color: '$tonal600' }}
    >
      {props.children.props.children}
    </Text>
  ),
  a: Link,
  code: CodeBlock,
  hr: (props) => <Divider {...props} css={{ my: '$5' }} />,
  table: (props) => <Table {...props} css={{ mb: '$4' }} />,
  td: (props) => <Cell size="md" appearance="content" {...props} />,
  th: (props) => <Cell size="md" appearance="heading" {...props} />,
  ColorPalette,
  Scale,
  IconTable,
  Text,
  Box
}

export const mdxToString = async (mdx = ''): Promise<MdxRemote.Source> => {
  return await renderToString(mdx, {
    components,
    scope: { theme }
  })
}

export const stringToMdx = (string: MdxRemote.Source): React.ReactNode => {
  return hydrate(string, {
    components
  })
}
