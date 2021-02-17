import { default as NextLink } from 'next/link'
import * as React from 'react'

import { PageBySlug } from '../utilities'
import { Box, Link, List, Text } from '.'

type NavigationProps = {
  items: [string, PageBySlug[]][]
}

const applyNavigationStucture = (items: [string, PageBySlug[]][]) => {
  return items.reduce((obj, [source, pages]) => {
    if (source === 'components') {
      return {
        ...obj,
        [source]: pages.reduce((obj, page) => {
          if (!obj[page.category || 'Overview']) {
            obj[page.category || 'Overview'] = []
          }

          return {
            ...obj,
            [page.category || 'Overview']: [
              ...obj[page.category || 'Overview'],
              page
            ]
          }
        }, {})
      }
    }

    return {
      ...obj,
      [source]: pages
    }
  }, {})
}

export const Navigation: React.FC<NavigationProps> = ({ items }) => {
  console.log(applyNavigationStucture(items))
  return (
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
      {Object.entries(applyNavigationStucture(items)).map(
        ([source, categories]) => (
          <React.Fragment key={source}>
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
              {source}
            </Text>
            {Array.isArray(categories)
              ? categories.map((page) => ({ id, source, title }) => (
                  <Box as="li" key={`${source}${id}`}>
                    <NextLink passHref href={`/${source}/${id}`}>
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
                        {title}
                      </Link>
                    </NextLink>
                  </Box>
                ))
              : Object.entries(categories).map(([category, pages]) => {
                  return (
                    <>
                      <Text
                        as="h4"
                        size="sm"
                        css={{
                          fontWeight: 600,
                          letterSpacing: '0.1em',
                          my: '$3'
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
                        {pages.map(({ id, source, title }) => (
                          <Box as="li" key={`${source}${id}`}>
                            <NextLink passHref href={`/${source}/${id}`}>
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
                                {title}
                              </Link>
                            </NextLink>
                          </Box>
                        ))}
                      </List>
                    </>
                  )
                })}
          </React.Fragment>
        )
      )}
    </Box>
  )
}
