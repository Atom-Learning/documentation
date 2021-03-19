import { Box, Flex, Text } from '@atom-learning/components'
import * as React from 'react'

type ScaleProps = {
  children: (value: string, key: string) => React.ReactNode
  scale: Record<string, string>
}

export const Scale: React.FC<ScaleProps> = ({ scale, children, ...props }) => (
  <Box {...props}>
    {Object.entries(scale).map(([key, value]) => (
      <Flex
        key={key}
        css={{
          alignItems: 'center',
          justifyContent: 'space-between',
          py: '$4',
          '&:not(:last-child)': {
            borderBottom: '1px solid $tonal200'
          }
        }}
      >
        {children(value, key)}
        <Text css={{ pl: '$4' }}>{`$${key}`}</Text>
      </Flex>
    ))}
  </Box>
)
