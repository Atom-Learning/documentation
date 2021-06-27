import { Box, Flex, Text } from '@atom-learning/components'
import * as React from 'react'

type ColorPaletteProps = {
  colors: Record<string, string>
}

export const ColorPalette: React.FC<ColorPaletteProps> = ({
  colors,
  ...props
}) => (
  <Flex css={{ flexDirection: 'column', flexWrap: 'wrap' }} {...props}>
    {Object.entries(colors).map(([key, value]) => (
      <Flex key={key} css={{ alignItems: 'center', mb: '$3', mr: '$3' }}>
        <Box css={{ borderRadius: '$round', bg: `$${key}`, size: '$5' }} />
        <Box css={{ pl: '$3' }}>
          <Text size="sm" css={{ fontWeight: 600, mb: '$2' }}>{`$${key}`}</Text>
          <Text size="sm" css={{ color: '$tonal500' }}>
            {value}
          </Text>
        </Box>
      </Flex>
    ))}
  </Flex>
)
