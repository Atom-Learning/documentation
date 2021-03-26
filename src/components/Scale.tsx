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
          py: '$4',
          '&:not(:last-child)': {
            borderBottom: '1px solid $tonal200'
          }
        }}
      >
        <Flex css={{ flexDirection: 'column' }}>
          <Text
            css={{
              color: '$tonal800',
              fontFamily: '$mono',
              fontSize: '$sm',
              mr: '$2',
              mb: '$3'
            }}
          >
            {`$${key}`}
          </Text>
          {displayValue && (
            <Text
              css={{
                color: '$tonal600',
                fontFamily: '$mono',
                fontSize: '$sm'
              }}
            >
              {value}
            </Text>
          )}
        </Flex>
        {children(value)}
      </Flex>
    ))}
  </Box>
)
