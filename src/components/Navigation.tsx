import {
  Flex,
  Heading,
  Icon,
  Link,
  styled,
  Text
} from '@atom-learning/components'
import { capitalCase } from 'capital-case'
import { default as NextLink } from 'next/link'
import * as React from 'react'

import { transformNavigationStructure } from '../utilities'

// Hook

const useOnClickOutside = (ref, handler) => {
  React.useEffect(() => {
    const listener = (event) => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target)) {
        return
      }
      handler(event)
    }

    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [ref, handler])
}

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
const StyledNavigation = styled('nav', {
  backgroundColor: 'white',
  borderRight: '1px solid $tonal300',
  boxShadow: '$1',
  height: '100vh',
  left: 0,
  overflowX: 'hidden',
  overflowY: 'auto',
  p: '$3',
  position: 'fixed',
  top: 0,
  width: 260,
  transform: 'translateX(-280px)',
  zIndex: 1,
  transition: 'transform 250ms ease-out',
  when: {
    lg: {
      boxShadow: 'none',
      position: 'sticky',
      transform: 'none',
      transition: '0ms'
    }
  },
  variants: {
    open: {
      true: {
        transform: 'translateX(0)'
      }
    }
  }
})

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

const IconMenu = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
)

export const Navigation: React.FC<NavigationProps> = ({ items }) => {
  const ref = React.useRef()
  const [menuOpen, setMenuOpen] = React.useState(false)

  useOnClickOutside(ref, () => setMenuOpen(false))

  return (
    <>
      <Flex
        as="button"
        onClick={() => setMenuOpen(true)}
        css={{
          alignItems: 'center',
          background: 'white',
          border: '1px solid $tonal400',
          borderRadius: '$0',
          cursor: 'pointer',
          justifyContent: 'center',
          left: '$3',
          p: 'unset',
          position: 'fixed',
          size: '$2',
          top: '$3',
          zIndex: 1,
          when: {
            lg: {
              display: 'none'
            }
          }
        }}
      >
        <Icon is={IconMenu} />
      </Flex>
      <StyledNavigation ref={ref} open={menuOpen}>
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
                  <React.Fragment key={category}>
                    {category && category !== 'void' && (
                      <CategoryHeading>{category}</CategoryHeading>
                    )}
                    <SourceList items={pages} />
                  </React.Fragment>
                ))
              )}
            </React.Fragment>
          )
        )}
      </StyledNavigation>
    </>
  )
}
