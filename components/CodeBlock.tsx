import React from 'react'
import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live'
import * as Components from '@atom-learning/components'
import tokens from '@atom-learning/theme'

export const CodeBlock = ({ children }) => {
  const scope = { ...Components, t: tokens }

  return (
    <LiveProvider scope={scope} code={children}>
      <LivePreview />
      <LiveEditor />
      <LiveError />
    </LiveProvider>
  )
}
