import tokens from '@atom-learning/theme'
import { createStyled } from '@stitches/react'

type CSSValue = number | string
type CSSBlob = { [key: string]: CSSValue }

export const utils = {
  p: (value: CSSValue): CSSBlob => ({
    padding: value
  }),
  pt: (value: CSSValue): CSSBlob => ({
    paddingTop: value
  }),
  pr: (value: CSSValue): CSSBlob => ({
    paddingRight: value
  }),
  pb: (value: CSSValue): CSSBlob => ({
    paddingBottom: value
  }),
  pl: (value: CSSValue): CSSBlob => ({
    paddingLeft: value
  }),
  px: (value: CSSValue): CSSBlob => ({
    paddingLeft: value,
    paddingRight: value
  }),
  py: (value: CSSValue): CSSBlob => ({
    paddingTop: value,
    paddingBottom: value
  }),

  m: (value: CSSValue): CSSBlob => ({
    margin: value
  }),
  mt: (value: CSSValue): CSSBlob => ({
    marginTop: value
  }),
  mr: (value: CSSValue): CSSBlob => ({
    marginRight: value
  }),
  mb: (value: CSSValue): CSSBlob => ({
    marginBottom: value
  }),
  ml: (value: CSSValue): CSSBlob => ({
    marginLeft: value
  }),
  mx: (value: CSSValue): CSSBlob => ({
    marginLeft: value,
    marginRight: value
  }),
  my: (value: CSSValue): CSSBlob => ({
    marginTop: value,
    marginBottom: value
  }),

  bg: (value: string): CSSBlob => ({
    background: value
  })
}

export const { styled, css } = createStyled({
  tokens,
  utils
})
