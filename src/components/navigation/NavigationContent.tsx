import { Heading, Link, Text } from '@atom-learning/components'
import { default as NextLink } from 'next/link'
import * as React from 'react'

import { NavigationItem, PageData } from './Navigation'

type NavigationContentProps = {
  content: NavigationItem
  onNavigate: () => void
}

type NavigationListProps = {
  items: PageData[]
  onNavigate: () => void
}

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

const NavigationList: React.FC<NavigationListProps> = ({
  items,
  onNavigate
}) => (
  <Text as="ul" css={{ listStyleType: 'none', m: 0, mb: '$3', p: 0 }}>
    {items.map(({ id, source, title }) =>
      title ? (
        <li key={`${source}${id}`}>
          <NextLink passHref href={`/${source}/${id}`}>
            <Link
              size="sm"
              css={{ display: 'block', py: '$0' }}
              onClick={onNavigate}
            >
              {title}
            </Link>
          </NextLink>
        </li>
      ) : null
    )}
  </Text>
)

export const NavigationContent: React.FC<NavigationContentProps> = ({
  content,
  onNavigate
}) => {
  if (Array.isArray(content)) {
    return <NavigationList items={content} onNavigate={onNavigate} />
  }

  return (
    <>
      {Object.entries(content).map(([category, pages]) => (
        <React.Fragment key={category}>
          {category && category !== 'void' && (
            <CategoryHeading>{category}</CategoryHeading>
          )}
          <NavigationList items={pages} onNavigate={onNavigate} />
        </React.Fragment>
      ))}
    </>
  )
}
