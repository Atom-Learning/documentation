import { Heading, styled } from '@atom-learning/components'
import pkg from '@atom-learning/components/package.json'
import { capitalCase } from 'capital-case'
import { default as NextLink } from 'next/link'
import * as React from 'react'

import { Pill } from '../'
import { Logo } from './Logo'
import { NavigationContent } from './NavigationContent'
import { NavigationTrigger } from './NavigationTrigger'

export type PageData = {
  id: string
  title: string
  source: 'overview' | 'theme' | 'components'
}

export type NavigationItem =
  | PageData[]
  | {
      [key: string]: PageData[]
    }

type NavigationProps = {
  items: {
    [key: string]: NavigationItem
  }
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

const StyledNavigation = styled('nav', {
  backgroundColor: 'white',
  borderRight: '1px solid $tonal300',
  boxShadow: '$1',
  height: '100vh',
  left: 0,
  overflowX: 'hidden',
  overflowY: 'auto',
  px: '$3',
  py: '$4',
  position: 'fixed',
  top: 0,
  width: 260,
  transform: 'translateX(-280px)',
  zIndex: 1,
  transition: 'transform 175ms ease-out',
  '@lg': {
    boxShadow: 'none',
    position: 'sticky',
    transform: 'none',
    transition: '0ms'
  },
  variants: {
    open: {
      true: {
        transform: 'translateX(0)'
      }
    }
  }
})

export const Navigation: React.FC<NavigationProps> = ({ items }) => {
  const ref = React.useRef()
  const [menuOpen, setMenuOpen] = React.useState(false)

  useOnClickOutside(ref, () => setMenuOpen(false))

  return (
    <>
      <NavigationTrigger onClick={() => setMenuOpen(true)} />
      <StyledNavigation ref={ref} open={menuOpen}>
        <NextLink href="/">
          <Logo
            css={{ fill: '$primary800', mb: '$4', height: 'auto', width: 40 }}
          />
        </NextLink>
        <Pill
          css={{
            position: 'absolute',
            right: '$3',
            top: '$3'
          }}
        >{`v${pkg.version}`}</Pill>
        {Object.entries(items).map(([source, content]) => (
          <React.Fragment key={source}>
            <Heading as="h2" size="xs" css={{ mb: '$3' }}>
              {capitalCase(source)}
            </Heading>
            <NavigationContent
              content={content}
              onNavigate={() => setMenuOpen(false)}
            />
          </React.Fragment>
        ))}
      </StyledNavigation>
    </>
  )
}
