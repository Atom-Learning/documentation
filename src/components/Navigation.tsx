import { default as NextLink } from 'next/link'
import * as React from 'react'

import { Box, Link, List, Text } from '.'

// type NavigationProps = {
//   items: [string, []][]
// }

export const Navigation = ({ items }) => (
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
            <Box as="li" key={page.id}>
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
