import { styled } from '../../stitches.config'

export const Link = styled('a', {
  color: '$primary600',
  textDecoration: 'none',
  ':hover,:focus': {
    color: '$primary800',
    textDecoration: 'underline'
  }
})
