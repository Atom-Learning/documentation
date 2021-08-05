import { Box, Flex, Text } from '@atom-learning/components'
import * as React from 'react'

type ScaleProps = {
  children: (value: string) => React.ReactNode
  displayValue?: boolean
  scale: Record<string, string>
}

export const Scale: React.FC<ScaleProps> = ({
  scale,
  children,
  displayValue = true,
  ...props
}) => (
  <Box {...props}>
    {Object.entries(scale).map(([key, value]) => (
      <Flex
        key={key}
        css={{
          alignItems: 'center',
          justifyContent: 'space-between',
          py: '$5',
          '&:not(:last-child)': {
            borderBottom: '1px solid $tonal100'
          }
        }}
      >
        <Flex css={{ mr: '$4', alignItems: 'center' }}>
          <Text
            css={{
              color: '$tonal700',
              fontSize: '$md',
              fontWeight: 600,
              minWidth: 20
            }}
          >
            {`$${key}`}
          </Text>
          {displayValue && (
            <Text css={{ color: '$tonal400', fontSize: '$sm', ml: '$4' }}>
              {value}
            </Text>
          )}
        </Flex>
        {children(value)}
      </Flex>
    ))}
  </Box>
)
