import { Box, Link, Text } from '@atom-learning/components'
import { default as NextLink } from 'next/link'
import * as React from 'react'

import { Container } from '../components'

type PaginationProps = {
  orderedPages: {
    id: string
    title: string
    source: 'overview' | 'theme' | 'components'
  }[]
  currentPage: {
    id: string
    source: 'overview' | 'theme' | 'components'
  }
}

export const Pagination: React.FC<PaginationProps> = ({
  orderedPages,
  currentPage
}) => {
  const currentPageIndex = orderedPages.findIndex(
    ({ id, source }) => id === currentPage.id && source === currentPage.source
  )
  const nextPage = orderedPages[currentPageIndex + 1]
  const previousPage = orderedPages[currentPageIndex - 1]

  return (
    <Box as="footer" css={{ bg: '$tonal50', mt: '$8' }}>
      <Container css={{ display: 'flex', py: '$6', px: '$4' }}>
        {previousPage && (
          <Box css={{ textAlign: 'left', mr: 'auto' }}>
            <Text css={{ color: '$tonal500' }} size="sm">
              Previous
            </Text>
            <NextLink
              passHref
              href={`/${previousPage.source}/${previousPage.id}`}
            >
              {/* @ts-ignore */}
              <Link size="lg" css={{ py: '$2' }}>
                {previousPage.title}
              </Link>
            </NextLink>
          </Box>
        )}
        {nextPage && (
          <Box css={{ textAlign: 'right', ml: 'auto' }}>
            <Text css={{ color: '$tonal500' }} size="sm">
              Next
            </Text>
            <NextLink passHref href={`/${nextPage.source}/${nextPage.id}`}>
              {/* @ts-ignore */}
              <Link size="lg" css={{ py: '$2' }}>
                {nextPage.title}
              </Link>
            </NextLink>
          </Box>
        )}
      </Container>
    </Box>
  )
}
