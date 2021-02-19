import * as Components from '@atom-learning/components'
import { styled } from '@atom-learning/components'
import Highlight, { defaultProps, Language } from 'prism-react-renderer'
import theme from 'prism-react-renderer/themes/nightOwl'
import * as React from 'react'
import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live'

const { Text } = Components

type CodeBlockProps = {
  center?: boolean
  children: string
  className?: string
  live?: boolean
  preview?: boolean
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
  overflow: 'hidden',
  position: 'relative',
  '&:focus-within': {
    boxShadow: '0 0 0 3px $primary500'
  }
})
const StyledLivePreview = styled(LivePreview, {
  mx: '-$4',
  overflow: 'hidden',
  px: '$4',
  py: '$5',
  variants: {
    layout: {
      center: {
        alignItems: 'center',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '$3',
        justifyContent: 'center'
      }
    }
  }
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
  center,
  children,
  className,
  live,
  preview
}) => {
  const language = className?.replace(/language-/, '') as Language

  if (live) {
    return (
      <LiveProvider
        code={children.trim()}
        scope={{ ...Components }}
        theme={theme}
      >
        <StyledLivePreview layout={center && 'center'} />
        <StyledPre>
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/*
          // @ts-ignore */}
          <StyledLiveEditor padding={null} />
          <Text
            as="span"
            size="sm"
            css={{
              color: '$tonal500',
              position: 'absolute',
              right: '$3',
              top: '$3'
            }}
          >
            Edit me!
          </Text>
        </StyledPre>
        <StyledLiveError />
      </LiveProvider>
    )
  }

  return (
    <>
      {preview && (
        <LiveProvider
          code={children.trim()}
          scope={{ ...Components }}
          theme={theme}
        >
          <StyledLivePreview layout={center && 'center'} />
          <StyledLiveError />
        </LiveProvider>
      )}
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
    </>
  )
}
