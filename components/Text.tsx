import * as React from 'react'

import { styled } from '../stitches.config'

const StyledText = styled('p', {
  color: '$tonal900',
  fontFamily: "'Inter', sans-serif",
  '> strong': {
    fontWeight: 600
  },
  '> code': {
    fontWeight: 600
  },
  '> a': {
    fontWeight: 600
  },
  variants: {
    size: {
      sm: {
        fontSize: '$sm',
        fontWeight: 400,
        lineHeight: 1.4
      },
      md: {
        fontSize: '$md',
        fontWeight: 400,
        lineHeight: 1.4
      },
      lg: {
        fontSize: '$lg',
        fontWeight: 600,
        lineHeight: 1.2
      },
      xl: {
        fontSize: '$xl',
        fontWeight: 800,
        lineHeight: 1.2
      }
    }
  }
})

export const Text = ({ size = 'md', ...rest }) => (
  <StyledText size={size} {...rest} />
)
