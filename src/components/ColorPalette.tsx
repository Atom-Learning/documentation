import { Box, Flex, Text } from '@atom-learning/components'
import { hsl, parseToHsl } from 'polished'
import * as React from 'react'

type ColorPaletteProps = {
  colors: Record<string, string>
}

export const ColorPalette: React.FC<ColorPaletteProps> = ({
  colors,
  ...props
}) => (
  <Flex css={{ flexDirection: 'column', flexWrap: 'wrap' }} {...props}>
    {Object.entries(colors).map(([key, value]) => {
      const color = parseToHsl(value)
      const hasAlpha = color?.alpha
      return (
        <Flex key={key} css={{ alignItems: 'center', mb: '$4', mr: '$3' }}>
          <Box css={{ borderRadius: '$round', bg: `$${key}`, size: '$6' }} />
          <Flex css={{ pl: '$3', flexDirection: 'column' }}>
            <Text css={{ fontWeight: 600, mb: '$3' }}>{`$${key}`}</Text>
            <Text
              size="sm"
              css={{ color: '$tonal400', mb: !hasAlpha ? '$3' : 0 }}
            >
              {value}
            </Text>
            {!hasAlpha && (
              <Text size="sm" css={{ color: '$tonal400' }}>
                {hsl(color)}
              </Text>
            )}
          </Flex>
        </Flex>
      )
    })}
  </Flex>
)
