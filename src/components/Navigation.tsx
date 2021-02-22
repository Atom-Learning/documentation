import { Box, Heading, Link, Text } from '@atom-learning/components'
import { capitalCase } from 'capital-case'
import { default as NextLink } from 'next/link'
import * as React from 'react'

import { transformNavigationStructure } from '../utilities'

const SourceHeading = (props) => (
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
const CategoryHeading = (props) => (
  <Heading
    {...props}
    as="h3"
    css={{
      color: '$tonal600',
      fontSize: '$sm',
      fontWeight: 400,
      letterSpacing: '0.1em',
      mb: '$1',
      textTransform: 'uppercase'
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
      mb: '$3',
      p: 0
    }}
  />
)

type SourceListProps = {
  items: {
    id: string
    title: string
    source: 'overview' | 'theme' | 'components'
  }[]
}

const SourceList: React.FC<SourceListProps> = ({ items }) => (
  <List>
    {items.map(({ id, source, title }) =>
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
)

type NavigationProps = {
  items: [
    string,
    {
      category?: string
    }[]
  ][]
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
      width: 260
    }}
  >
    <Heading size="sm" css={{ mb: '$4' }}>
      Atom Learning
      <br />
      Design System
    </Heading>
    {Object.entries(transformNavigationStructure(items)).map(
      ([source, content]) => (
        <React.Fragment key={source}>
          <SourceHeading>{capitalCase(source)}</SourceHeading>
          {Array.isArray(content) ? (
            <SourceList items={content} />
          ) : (
            Object.entries(content).map(([category, pages]) => (
              <>
                {category && category !== 'void' && (
                  <CategoryHeading>{category}</CategoryHeading>
                )}
                <SourceList items={pages} />
              </>
            ))
          )}
        </React.Fragment>
      )
    )}
  </Box>
)
