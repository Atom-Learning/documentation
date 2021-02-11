import * as React from 'react'
import { Merge } from 'type-fest'

import { StitchesProps, styled } from '../stitches.config'

const StyledText = styled('p', {
  color: '$tonal800',
  fontFamily: "'Inter', sans-serif",
  variants: {
    size: {
      sm: {
        fontSize: '$sm',
        fontWeight: 400,
        lineHeight: 1.6
      },
      md: {
        fontSize: '$md',
        fontWeight: 400,
        lineHeight: 1.6
      },
      lg: {
        color: '$tonal900',
        fontSize: '$lg',
        fontWeight: 600,
        lineHeight: 1.2
      },
      xl: {
        color: '$tonal900',
        fontSize: '$xl',
        fontWeight: 800,
        lineHeight: 1.2
      },
      xxl: {
        color: '$tonal900',
        fontSize: '$xxl',
        fontWeight: 800,
        lineHeight: 1.2
      }
    }
  }
})

type TextProps = Merge<
  StitchesProps<typeof StyledText>,
  {
    as?: 'p' | 'h1' | 'h2' | 'h3'
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
  }
>

export const Text: React.FC<TextProps> = ({ size = 'md', ...rest }) => (
  <StyledText size={size} {...rest} />
)
