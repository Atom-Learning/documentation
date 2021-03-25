import * as Icons from '@atom-learning/icons'
import { Flex, Box, Icon, CSS } from '@atom-learning/components'
import * as React from 'react'

const copyIcon = (str: string) => {
  const el = document.createElement('textarea')
  el.value = str
  document.body.appendChild(el)
  el.select()
  document.execCommand('copy')
  document.body.removeChild(el)
}

type IconTableProps = {
  css: CSS
}

export const IconTable: React.FC<IconTableProps> = ({ css }) => (
  <Flex css={{ flexWrap: 'wrap', gap: '$2', ...(css as any) }}>
    {Object.entries(Icons).map(([key, Val]) => (
      <Flex
        as="button"
        key={key}
        css={{
          alignItems: 'center',
          bg: 'white',
          border: '1px solid $tonal300',
          borderRadius: '$1',
          cursor: 'pointer',
          flex: '1 0 auto',
          flexDirection: 'column',
          justifyContent: 'center',
          p: '$4',
          transition: 'all 75ms ease-out',
          '&:hover,&:focus': {
            borderColor: '$primary900',
            boxShadow: 'inset 0 0 0 1px $colors$primary900',
            '& svg': {
              transform: 'scale(1.5)'
            }
          },
          '&:focus': {
            outline: 'none'
          }
        }}
        onClick={() => copyIcon(key)}
        title={key}
      >
        <Icon
          is={Val}
          size="md"
          css={{ color: '$primary900', transition: 'all 75ms ease-out' }}
        />
      </Flex>
    ))}
    {/* Prevent last item filling the entire width */}
    {[0, 1, 2, 3, 4].map((i) => (
      <Box key={i} css={{ flex: '1 0 auto', p: '$4' }}>
        <Box css={{ size: '$2' }} />
      </Box>
    ))}
  </Flex>
)
