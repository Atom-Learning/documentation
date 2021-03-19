import { Box, Flex, Text } from '@atom-learning/components'
import * as React from 'react'

const getColorLightness = (color: string): number => {
  // parse hsl
  const reg = new RegExp(/hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g)
  // exit if can't match hsl
  if (!color.match(reg)) return undefined
  // format h, s, l values into array
  const result = color.split(reg).filter(Boolean)
  // access lightness value
  return parseInt(result[result.length - 1])
}

type ColorPaletteProps = {
  colors: Record<string, string>
}

export const ColorPalette: React.FC<ColorPaletteProps> = ({
  colors,
  ...props
}) => (
  <Box {...props}>
    {Object.entries(colors).map(([key, value]) => {
      const color = getColorLightness(value) > 70 ? '$tonal700' : 'white'
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
