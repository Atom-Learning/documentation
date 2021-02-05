import * as Components from '@atom-learning/components'
import Highlight, { defaultProps } from 'prism-react-renderer'
import theme from 'prism-react-renderer/themes/nightOwl'
import * as React from 'react'
import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live'

import { styled } from '../stitches.config'

const StyledPre = styled('pre', {
  borderRadius: '$1',
  display: 'block',
  fontSize: '15px',
  lineHeight: 1.5,
  fontWeight: 100,
  mx: '-$4',
  mt: 0,
  mb: '$4',
  overflow: 'hidden'
})

const StyledLiveEditor = styled(LiveEditor, {
  padding: 0,
  margin: 0,
  '> .npm__react-simple-code-editor__textarea': {
    padding: '24px 32px'
  },
  '> pre': {
    padding: '24px 32px'
  }
})
const StyledLiveError = styled(LiveError, {
  fontFamily: '"Inter"',
  fontSize: '$sm',
  color: '$danger'
})
const StyledLivePreview = styled(LivePreview, {
  px: '$4',
  py: '$5',
  mx: '-$4',
  overflow: 'hidden'
})

export const CodeBlock = ({ children, live, className }) => {
  const language = className?.replace(/language-/, '')

  if (live) {
    return (
      <LiveProvider
        code={children.trim()}
        scope={{ ...Components }}
        theme={theme}
      >
        <StyledLivePreview />
        <StyledPre>
          <StyledLiveEditor />
        </StyledPre>
        <StyledLiveError />
      </LiveProvider>
    )
  }

  return (
    <StyledPre>
      <Highlight
        {...defaultProps}
        theme={theme}
        code={children.trim()}
        language={language}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={className}
            style={{
              ...style,
              padding: '24px 32px',
              margin: 0,
              overflow: 'auto'
            }}
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </StyledPre>
  )
}
