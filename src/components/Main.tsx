import { MDXProvider } from '@mdx-js/react'
import * as React from 'react'

import { Box, CodeBlock, InlineCode, Link, List, PropsTable, Text } from '.'

const components = {
  h1: (props) => <Text {...props} size="xxl" as="h1" />,
  h2: (props) => <Text {...props} size="lg" as="h2" />,
  h3: (props) => <Text {...props} css={{ fontWeight: 600 }} as="h3" />,
  p: (props) => <Text {...props} />,
  ul: (props) => <List {...props} />,
  inlineCode: InlineCode,
  a: Link,
  code: CodeBlock,
  PropsTable: PropsTable
}

export const Main: React.FC = ({ children }) => (
  <Box
    as="main"
    css={{
      flex: 1,
      maxWidth: 640,
      mx: 'auto',
      px: '$3',
      py: '$5'
    }}
  >
    <MDXProvider components={components}>{children}</MDXProvider>
  </Box>
)
