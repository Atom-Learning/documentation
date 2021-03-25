import { Flex, Icon } from '@atom-learning/components'
import * as React from 'react'
import { Hamburger } from '@atom-learning/icons'

type NavigationTriggerProps = {
  onClick: () => void
}

export const NavigationTrigger: React.FC<NavigationTriggerProps> = (props) => (
  <Flex
    as="button"
    css={{
      alignItems: 'center',
      background: 'white',
      border: '1px solid $tonal400',
      borderRadius: '$0',
      cursor: 'pointer',
      color: '$tonal900',
      justifyContent: 'center',
      left: '$3',
      p: 'unset',
      position: 'fixed',
      size: '$4',
      top: '$3',
      zIndex: 1,
      '@lg': {
        display: 'none'
      }
    }}
    {...props}
  >
    <Icon is={Hamburger} />
  </Flex>
)
