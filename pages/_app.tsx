import { MDXProvider } from '@mdx-js/react'
import type { AppProps } from 'next/app'
import * as React from 'react'

import {
  Box,
  CodeBlock,
  Flex,
  InlineCode,
  Link,
  List,
  PropsTable,
  Text
} from '../components'
import { frontMatter as pages } from '../pages/**/*.mdx'
import { css } from '../stitches.config'

css.global({
  body: { margin: 0 }
})()

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

const nav = pages.reduce((obj, curr) => {
  if (!obj[curr.category]) {
    obj[curr.category] = []
  }
  return {
    ...obj,
    [curr.category]: [...obj[curr.category], curr]
  }
}, {})

const App: React.FC<AppProps> = ({ Component, pageProps }) => (
  <Flex>
    <Box
      as="nav"
      css={{
        position: 'sticky',
        top: 0,
        p: '$3',
        borderRight: '1px solid $tonal300',
        width: 220
      }}
    >
      <Text size="lg" css={{ mb: '$4' }}>
        Atom Learning Design System
      </Text>
      {Object.keys(nav).map((key) => (
        <>
          <Text
            as="h3"
            size="sm"
            css={{
              textTransform: 'uppercase',
              fontWeight: 600,
              letterSpacing: '0.1em',
              mb: '$2'
            }}
          >
            {key}
          </Text>
          <List
            css={{
              m: 0,
              mb: '$4',
              p: 0,
              listStyleType: 'none',
              lineHeight: 1.2
            }}
          >
            {nav[key].map((page) => (
              <Box as="li" key={page.id}>
                <Link
                  href={page.id === 'index' ? '/' : `/${page.id}`}
                  css={{
                    color: '$tonal700',
                    fontWeight: 500,
                    fontSize: '$sm',
                    lineHeight: 1.2,
                    mb: '$2',
                    display: 'block'
                  }}
                >
                  {page.title}
                </Link>
              </Box>
            ))}
          </List>
        </>
      ))}
    </Box>
    <Box
      as="main"
      css={{
        maxWidth: 640,
        mx: 'auto',
        flex: 1,
        py: '$5',
        px: '$3'
      }}
    >
      <MDXProvider components={components}>
        <Component {...pageProps} />
      </MDXProvider>
    </Box>
  </Flex>
)

export default App
