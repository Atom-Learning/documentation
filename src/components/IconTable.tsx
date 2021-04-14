import { Box, CSS, Flex, Icon, Tooltip } from '@atom-learning/components'
import * as Icons from '@atom-learning/icons'
import * as React from 'react'

const copyIcon = (str: string) => {
  const el = document.createElement('textarea')
  el.value = str
  document.body.appendChild(el)
  el.select()
  document.execCommand('copy')
  document.body.removeChild(el)
}

const IconTableItem = ({ name, Component }) => (
  <Tooltip>
    <Tooltip.Trigger>
      <Flex
        as="button"
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
        onClick={() => copyIcon(name)}
      >
        <Icon
          is={Component}
          size="md"
          css={{ color: '$primary900', transition: 'all 100ms ease-out' }}
        />
      </Flex>
    </Tooltip.Trigger>
    <Tooltip.Content>{name}</Tooltip.Content>
  </Tooltip>
)

type IconTableProps = {
  css: CSS
}

export const IconTable: React.FC<IconTableProps> = ({ css }) => (
  <Flex
    css={{
      flexWrap: 'wrap',
      gap: '$2',
      '@md': { mx: '-$sizes$4' },
      '@lg': { mx: 'calc(($sizes$6 + $sizes$0) * -1)' },
      ...(css as any)
    }}
  >
    {Object.entries(Icons).map(([key, value]) => (
      <IconTableItem key={key} name={key} Component={value} />
    ))}
    {/* Prevent last item filling the entire width */}
    {[0, 1, 2, 3, 4].map((i) => (
      <Box key={i} css={{ flex: '1 0 auto', p: '$4' }}>
        <Box css={{ size: '$2' }} />
      </Box>
    ))}
  </Flex>
)
