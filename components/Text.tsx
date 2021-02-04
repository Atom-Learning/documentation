import * as React from 'react'

import { styled } from '../stitches.config'

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

export const Text = ({ size = 'md', ...rest }) => (
  <StyledText size={size} {...rest} />
)
