import { Flex, Heading, Icon, Link, Text } from '@atom-learning/components'
import { ArrowRight } from '@atom-learning/icons'
import { default as NextLink } from 'next/link'
import { useRouter } from 'next/router'
import * as React from 'react'

import { NavigationItem, PageData } from './Navigation'

type NavigationContentProps = {
  content: NavigationItem
  onNavigate: () => void
}

type NavigationListProps = {
  items: PageData[]
  onNavigate: () => void
  currentPage: string
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
      mb: '$3',
      textTransform: 'uppercase'
    }}
  />
)

const NavigationList: React.FC<NavigationListProps> = ({
  items,
  onNavigate,
  currentPage
}) => {
  return (
    <Text as="ul" css={{ listStyleType: 'none', m: 0, mb: '$4', p: 0 }}>
      {items.map(({ id, source, title }) => {
        if (!title) return null
        const isCurrentPage = `/${source}/${id}` === currentPage
        return (
          <Flex
            as="li"
            css={{ justifyContent: 'space-between', alignItems: 'center' }}
            key={`${source}${id}`}
          >
            <NextLink passHref href={`/${source}/${id}`}>
              <Link
                size="sm"
                css={{
                  display: 'block',
                  py: '$2',
                  ...(isCurrentPage ? { color: '$primary800' } : {})
                }}
                onClick={onNavigate}
              >
                {title}
              </Link>
            </NextLink>
            {isCurrentPage && (
              <Icon css={{ color: '$primary800' }} size="sm" is={ArrowRight} />
            )}
          </Flex>
        )
      })}
    </Text>
  )
}

export const NavigationContent: React.FC<NavigationContentProps> = ({
  content,
  onNavigate
}) => {
  const router = useRouter()
  if (Array.isArray(content)) {
    return (
      <NavigationList
        items={content}
        onNavigate={onNavigate}
        currentPage={router.asPath}
      />
    )
  }

  return (
    <>
      {Object.entries(content).map(([category, pages]) => (
        <React.Fragment key={category}>
          {category && category !== 'void' && (
            <CategoryHeading>{category}</CategoryHeading>
          )}
          {pages && (
            <NavigationList
              items={pages}
              onNavigate={onNavigate}
              currentPage={router.asPath}
            />
          )}
        </React.Fragment>
      ))}
    </>
  )
}
