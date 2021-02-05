import * as Components from '@atom-learning/components'
import Highlight, { defaultProps } from 'prism-react-renderer'
import theme from 'prism-react-renderer/themes/nightOwl'
import * as React from 'react'
import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live'

import { styled } from '../stitches.config'

type CodeBlockProps = {
  children: string
  live?: boolean
  center?: boolean
  className?: string
}

const StyledPre = styled('pre', {
  borderRadius: '$1',
  display: 'block',
  fontSize: '15px',
  fontWeight: 100,
  lineHeight: 1.5,
  mb: '$4',
  mt: 0,
  mx: '-$4',
  overflow: 'hidden'
})
const StyledLivePreview = styled(LivePreview, {
  mx: '-$4',
  overflow: 'hidden',
  px: '$4',
  py: '$5'
})
const StyledLiveEditor = styled(LiveEditor, {
  '> textarea,> pre': {
    padding: '24px 32px'
  }
})
const StyledLiveError = styled(LiveError, {
  color: '$danger',
  fontFamily: '"Inter"',
  fontSize: '$sm'
})

export const CodeBlock: React.FC<CodeBlockProps> = ({
  children,
  live,
  center,
  className
}) => {
  const language = className?.replace(/language-/, '')

  if (live) {
    return (
      <LiveProvider
        code={children.trim()}
        scope={{ ...Components }}
        theme={theme}
      >
        <StyledLivePreview
          css={
            center && {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }
          }
        />
        <StyledPre>
          <StyledLiveEditor padding={null} />
        </StyledPre>
        <StyledLiveError />
      </LiveProvider>
    )
  }

  return (
    <StyledPre>
      <Highlight
        {...defaultProps}
        code={children.trim()}
        language={language}
        theme={theme}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={className}
            style={{
              ...style,
              margin: 0,
              overflow: 'auto',
              padding: '24px 32px'
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
