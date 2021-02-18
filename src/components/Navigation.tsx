import { Box, Heading, Link, Text } from '@atom-learning/components'
import { default as NextLink } from 'next/link'
import * as React from 'react'

import { PageBySlug } from '../utilities'

type NavigationProps = {
  items: [string, PageBySlug[]][]
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
    <Heading size="sm" css={{ mb: '$4' }}>
      Atom Learning
      <br />
      Design System
    </Heading>
    {items.map(([category, pages]) => (
      <React.Fragment key={category}>
        <Heading
          css={{
            fontSize: '$sm',
            textTransform: 'uppercase',
            fontWeight: 600,
            letterSpacing: '0.1em',
            mb: '$2'
          }}
        >
          {category}
        </Heading>
        <Text
          as="ul"
          css={{
            m: 0,
            mb: '$4',
            p: 0,
            listStyleType: 'none',
            lineHeight: 1.2
          }}
        >
          {pages.map(({ data: page }) => (
            <li key={page.id}>
              <NextLink passHref href={`/${page.category}/${page.id}`}>
                <Link
                  size="sm"
                  css={{
                    display: 'block',
                    py: '$1'
                  }}
                >
                  {page.title}
                </Link>
              </NextLink>
            </li>
          ))}
        </Text>
      </React.Fragment>
    ))}
  </Box>
)
