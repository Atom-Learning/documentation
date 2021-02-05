import docgen from '@atom-learning/components/dist/docgen.json'
import * as React from 'react'

import { styled } from '../stitches.config'
import { Box, InlineCode, Link, Text } from './'

type Props = {
  for: React.ReactElement
}

// const HeadCell = styled('th', {
//   borderBottom: '1px solid $tonal300',
//   fontSize: '$sm',
//   fontFamily: '"Inter"',
//   fontWeight: 600,
//   color: '$tonal900',
//   py: '$3',
//   pr: '$3',
//   whiteSpace: 'nowrap',
// })

const Cell = styled('td', {
  borderBottom: '1px solid $tonal300',
  color: '$tonal800',
  fontSize: '$md',
  fontFamily: '"Inter"',
  py: '$3',
  pr: '$3',
  textAlign: 'left',
  variants: {
    appearance: {
      heading: {
        fontSize: '$sm',
        whiteSpace: 'nowrap',
        fontWeight: 600
      }
    }
  }
})

export const PropsTable = ({ for: Component }: Props): React.ReactElement => {
  const data = docgen.find(
    (component) => component.displayName === Component.displayName
  )

  return (
    <Box css={{ mt: '$5' }}>
      <Text size="lg">API Reference</Text>
      <Box as="table" css={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <Cell as="th" appearance="heading">
            Prop
          </Cell>
          <Cell as="th" appearance="heading">
            Type
          </Cell>
          <Cell as="th" appearance="heading">
            Required
          </Cell>
          <Cell as="th" appearance="heading">
            Default value
          </Cell>
        </thead>
        <tbody>
          {Object.keys(data.props).map((key) => {
            const prop = data.props[key]
            return (
              <Box as="tr" key={prop.name}>
                <Cell>
                  <InlineCode>{prop.name}</InlineCode>
                </Cell>
                <Cell
                  css={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '$2',
                    alignItems: 'center'
                  }}
                >
                  {prop.name === 'css' ? (
                    <>
                      <InlineCode>"object"</InlineCode>
                      <Link
                        size="sm"
                        href="https://stitches.dev/docs/overriding-styles"
                      >
                        Read about `css` styles
                      </Link>
                    </>
                  ) : prop.name === 'as' ? (
                    <>
                      <InlineCode>"string"</InlineCode>
                      <Link
                        size="sm"
                        href="https://stitches.dev/docs/overriding-styles#overriding-the-html-tag"
                      >
                        Read about overriding the element
                      </Link>
                    </>
                  ) : Array.isArray(prop.type.value) ? (
                    prop.type.value
                      .filter((val) => val.value !== 'undefined')
                      .map((val) => (
                        <InlineCode key={val.value}>{val.value}</InlineCode>
                      ))
                  ) : (
                    <InlineCode>{prop.type.name}</InlineCode>
                  )}
                </Cell>
                <Cell>
                  <InlineCode>{prop.required.toString()}</InlineCode>
                </Cell>
                <Cell>
                  {prop.defaultValue ? (
                    <InlineCode>{prop.defaultValue.value}</InlineCode>
                  ) : (
                    '-'
                  )}
                </Cell>
              </Box>
            )
          })}
        </tbody>
      </Box>
    </Box>
  )
}
