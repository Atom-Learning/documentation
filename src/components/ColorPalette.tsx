import { Box, Flex, Text } from '@atom-learning/components'
import * as React from 'react'

const getLightness = (color) => {
  const reg = new RegExp(/hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g)
  const result = color.split(reg).filter(Boolean)
  return parseInt(result[result.length - 1]) < 70
}

export const ColorPalette = ({ colors }) => (
  <Box>
    {Object.entries(colors).map(([key, value]) => {
      const color = getLightness(value) ? 'white' : '$tonal800'
      return (
        <Flex
          key={key}
          css={{
            alignItems: 'center',
            bg: `$${key}`,
            justifyContent: 'space-between',
            px: '$4',
            py: '$3'
          }}
        >
          <Text css={{ color }}>{`$${key}`}</Text>
          <Text size="sm" css={{ color }}>
            {value}
          </Text>
        </Flex>
      )
    })}
  </Box>
)
