import { Flex, Icon } from '@atom-learning/components'
import * as React from 'react'
import { Menu } from 'react-feather'

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
