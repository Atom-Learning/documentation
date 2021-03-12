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
import { Menu } from 'react-feather'

type PageData = {
  id: string
  title: string
  source: 'overview' | 'theme' | 'components'
}

type NavigationProps = {
  items: {
    [key: string]:
      | PageData[]
      | {
          [key: string]: PageData[]
        }
  }
}

type SourceListProps = {
  items: PageData[]
  onNavigate: () => void
}

const useOnClickOutside = (ref, handler) => {
  React.useEffect(() => {
    const listener = (event) => {
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
  transition: 'transform 175ms ease-out',
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

const NavigationButton = (props) => (
  <Flex
    as="button"
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
    {...props}
  >
    <Icon is={Menu} />
  </Flex>
)

const SourceList: React.FC<SourceListProps> = ({ items, onNavigate }) => (
  <List>
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
  </List>
)

export const Navigation: React.FC<NavigationProps> = ({ items }) => {
  const ref = React.useRef()
  const [menuOpen, setMenuOpen] = React.useState(false)

  useOnClickOutside(ref, () => setMenuOpen(false))

  return (
    <>
      <NavigationButton onClick={() => setMenuOpen(true)} />
      <StyledNavigation ref={ref} open={menuOpen}>
        <Heading size="sm" css={{ mb: '$4' }}>
          Atom Learning
          <br />
          Design System
        </Heading>
        {Object.entries(items).map(([source, content]) => (
          <React.Fragment key={source}>
            <SourceHeading>{capitalCase(source)}</SourceHeading>
            {Array.isArray(content) ? (
              <SourceList
                items={content}
                onNavigate={() => setMenuOpen(false)}
              />
            ) : (
              Object.entries(content).map(([category, pages]) => (
                <React.Fragment key={category}>
                  {category && category !== 'void' && (
                    <CategoryHeading>{category}</CategoryHeading>
                  )}
                  <SourceList
                    items={pages}
                    onNavigate={() => setMenuOpen(false)}
                  />
                </React.Fragment>
              ))
            )}
          </React.Fragment>
        ))}
      </StyledNavigation>
    </>
  )
}
