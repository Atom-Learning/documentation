import * as Components from '@atom-learning/components'
import { styled } from '@atom-learning/components'
import * as Icons from '@atom-learning/icons'
import Highlight, { defaultProps, Language } from 'prism-react-renderer'
import theme from 'prism-react-renderer/themes/nightOwl'
import * as React from 'react'
import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live'

const { Text, css } = Components

type CodeBlockProps = {
  center?: boolean
  children: string
  className?: string
  live?: boolean
  preview?: boolean
}

const StyledPre = styled('pre', {
  display: 'block',
  fontSize: '$sm',
  fontWeight: 100,
  lineHeight: 1.5,
  mb: '$4',
  mt: 0,
  mx: '-$3',
  overflow: 'hidden',
  position: 'relative',
  '&:focus-within': {
    boxShadow: '0 0 0 3px $colors$primary500'
  },
  '@sm': {
    borderRadius: '$1',
    mx: 0
  },
  '@md': {
    fontSize: '15px',
    mx: '-$4'
  }
})
const StyledLivePreview = styled(LivePreview, {
  alignItems: 'center',
  display: 'flex',
  flexWrap: 'wrap',
  gap: '$3',
  justifyContent: 'center',
  overflow: 'visible',
  p: '$4',
  mx: '-$3',
  whiteSpace: 'initial',
  '@sm': {
    borderRadius: '$1',
    mx: 0
  },
  '@md': {
    mx: '-$4',
    py: '$5'
  }
})
const StyledLiveEditor = styled(LiveEditor, {
  '> textarea,> pre': {
    p: '$3',
    '@md': {
      px: '$4',
      py: '$sizes$2'
    }
  }
})
const StyledLiveError = styled(LiveError, {
  color: '$danger',
  fontFamily: '"Inter"',
  fontSize: '$sm'
})

export const CodeBlock: React.FC<CodeBlockProps> = ({
  children,
  className,
  live,
  preview
}) => {
  const language = className?.replace(/language-/, '') as Language
  const code = children.trim()
  const scope = { ...Icons, ...Components }

  if (live) {
    return (
      <LiveProvider code={code} scope={scope} theme={theme}>
        <StyledLivePreview />
        <StyledPre>
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/*
          // @ts-ignore */}
          <StyledLiveEditor padding={null} />
          <Text
            as="span"
            size="sm"
            css={{
              display: 'none',
              color: '$tonal500',
              pointerEvents: 'none',
              position: 'absolute',
              right: '$3',
              top: '$2',
              '@sm': {
                display: 'block'
              }
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
        <LiveProvider code={code} scope={scope} theme={theme}>
          <StyledLivePreview />
          <StyledLiveError />
        </LiveProvider>
      )}
      <StyledPre>
        <Highlight
          {...defaultProps}
          code={code}
          language={language}
          theme={theme}
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre
              className={`${className} ${css({
                ...style,
                m: 0,
                overflow: 'auto',
                p: '$3',
                '@md': {
                  px: '$4',
                  py: '$sizes$2'
                }
              })}`}
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
