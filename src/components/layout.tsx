import * as Components from '@atom-learning/components'
import { MDXProvider } from '@mdx-js/react'
import { default as NextLink } from 'next/link'
import * as React from 'react'

import { Box, CodeBlock, InlineCode, Link, List, PropsTable, Text } from '.'

type NavigationProps = {
  items: [string, any[]][]
}

const components = {
  h1: (props) => <Text {...props} size="xxl" as="h1" />,
  h2: (props) => <Text {...props} size="lg" as="h2" />,
  h3: (props) => <Text {...props} css={{ fontWeight: 600 }} as="h3" />,
  p: (props) => <Text {...props} />,
  ul: (props) => <List {...props} />,
  inlineCode: InlineCode,
  a: Link,
  code: CodeBlock,
  PropsTable: PropsTable,
  // Button: (props) => <p {...props} />,
  ...Components
}

export const Navigation: React.FC<NavigationProps> = ({ items }) => (
  <Box
    as="nav"
    css={{
      borderRight: '1px solid $tonal300',
      boxSizing: 'border-box',
      height: '100vh',
      overflowX: 'hidden',
      overflowY: 'auto',
      p: '$3',
      position: 'sticky',
      top: 0,
      width: 300
    }}
  >
    <Text size="lg" css={{ mb: '$4' }}>
      Atom Learning
      <br />
      Design System
    </Text>
    {items.map(([category, pages]) => (
      <React.Fragment key={category}>
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
          {category}
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
          {pages.map((page) => (
            <Box as="li" key={page.data.id}>
              <NextLink passHref href={`/${category}/${page.id}`}>
                <Link
                  css={{
                    color: '$tonal700',
                    display: 'block',
                    fontSize: '$sm',
                    fontWeight: 500,
                    lineHeight: 1.2,
                    mb: '$2'
                  }}
                >
                  {page.data.title}
                </Link>
              </NextLink>
            </Box>
          ))}
        </List>
      </React.Fragment>
    ))}
  </Box>
)

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
