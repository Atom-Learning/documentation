import { Box, Heading, Link, Text } from '@atom-learning/components'
import { capitalCase } from 'capital-case'
import { default as NextLink } from 'next/link'
import * as React from 'react'

import { PageBySlug } from '../utilities'

type NavigationProps = {
  items: [
    string,
    {
      category?: string
    }[]
  ][]
}

const applyNavigationStucture = (
  items: [
    string,
    {
      category?: string
    }[]
  ][]
) =>
  items.reduce((obj, [source, pages]) => {
    if (pages.some((page) => page.category)) {
      return {
        ...obj,
        [source]: pages.reduce((obj, page) => {
          if (!obj[page.category]) {
            obj[page.category] = []
          }
          return {
            ...obj,
            [page.category]: [...obj[page.category], page]
          }
        }, {})
      }
    }

    return {
      ...obj,
      [source]: pages
    }
  }, {})

const HeadingCategory = (props) => (
  <Heading
    {...props}
    as="h3"
    css={{
      color: '$tonal800',
      fontSize: '$sm',
      fontWeight: 500,
      letterSpacing: '0.1em',
      mb: '$2',
      textTransform: 'uppercase'
    }}
  />
)
const HeadingSource = (props) => (
  <Heading
    {...props}
    as="h2"
    css={{
      fontSize: '$md',
      fontWeight: 600,
      mb: '$2'
    }}
  />
)
const List = (props) => (
  <Text
    {...props}
    as="ul"
    css={{
      listStyleType: 'none',
      m: 0,
      mb: '$4',
      p: 0
    }}
  />
)

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
      width: 260
    }}
  >
    <Heading size="sm" css={{ mb: '$4' }}>
      Atom Learning
      <br />
      Design System
    </Heading>
    {Object.entries(applyNavigationStucture(items)).map(
      ([source, categories]) => (
        <React.Fragment key={source}>
          <HeadingSource>{capitalCase(source)}</HeadingSource>
          {Array.isArray(categories) ? (
            <List>
              {categories.map(({ id, source, title }) =>
                title ? (
                  <li key={`${source}${id}`}>
                    <NextLink passHref href={`/${source}/${id}`}>
                      <Link size="sm" css={{ display: 'block', py: '$0' }}>
                        {title}
                      </Link>
                    </NextLink>
                  </li>
                ) : null
              )}
            </List>
          ) : (
            Object.entries(categories).map(([category, pages]) => (
              <>
                <HeadingCategory>{category}</HeadingCategory>
                <List>
                  {pages.map(({ id, source, title }) =>
                    title ? (
                      <li key={`${source}${id}`}>
                        <NextLink passHref href={`/${source}/${id}`}>
                          <Link size="sm" css={{ display: 'block', py: '$0' }}>
                            {title}
                          </Link>
                        </NextLink>
                      </li>
                    ) : null
                  )}
                </List>
              </>
            ))
          )}
        </React.Fragment>
      )
    )}
  </Box>
)
