import Highlight, { defaultProps } from 'prism-react-renderer'
import theme from 'prism-react-renderer/themes/nightOwl'
import * as React from 'react'

import { styled } from '../stitches.config'

const StyledPre = styled('pre', {
  borderRadius: '$1',
  display: 'block',
  fontSize: '15px',
  lineHeight: 1.5,
  fontWeight: 100,
  mx: '-$4',
  my: '$4',
  overflow: 'hidden'
})

export const CodeBlock = ({ children, className }) => {
  const language = className?.replace(/language-/, '')

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
