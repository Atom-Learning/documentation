import docgen from '@atom-learning/components/dist/docgen.json'
import * as React from 'react'

import { styled } from '../stitches.config'
import { Box, InlineCode, Link, Text } from './'

type PropsTableProps = {
  for: React.FC
}

const columns = ['Prop', 'Type', 'Default value', 'Required']

const Table = styled('table', {
  borderCollapse: 'collapse',
  width: '100%'
})
const Cell = styled('td', {
  borderBottom: '1px solid $tonal300',
  color: '$tonal800',
  fontSize: '$md',
  fontFamily: '"Inter"',
  py: '$3',
  pr: '$3',
  textAlign: 'left',
  verticalAlign: 'middle',
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

const PropTypeCSS = () => (
  <Link href="https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react/v16/index.d.ts#L1547">
    <InlineCode>"CSSProperties"</InlineCode>
  </Link>
)
const PropTypeAs = () => (
  <Link href="https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react/v16/index.d.ts#L2993">
    <InlineCode>"JSX.IntrinsicElements"</InlineCode>
  </Link>
)

export const PropsTable: React.FC<PropsTableProps> = ({
  for: Component
}): React.ReactElement => {
  const { props: componentProps } = docgen.find(
    (component) => component.displayName === Component.displayName
  )

  if (!componentProps) {
    return null
  }

  return (
    <Box css={{ mt: '$5' }}>
      <Text size="lg">API Reference</Text>
      <Table>
        <thead>
          {columns.map((column) => (
            <Cell as="th" appearance="heading" key={column}>
              {column}
            </Cell>
          ))}
        </thead>
        <tbody>
          {Object.keys(componentProps).map((key) => {
            const { name, type, defaultValue, required } = componentProps[key]

            return (
              <tr key={key}>
                <Cell css={{ pr: '$4' }}>
                  <InlineCode>{name}</InlineCode>
                </Cell>
                <Cell>
                  {name === 'css' ? (
                    <PropTypeCSS />
                  ) : name === 'as' ? (
                    <PropTypeAs />
                  ) : Array.isArray(type.value) ? (
                    <Box css={{ display: 'flex', gap: '$2' }}>
                      {type.value
                        .filter(({ value }) => value !== 'undefined')
                        .map(({ value }) => (
                          <InlineCode key={value}>{value}</InlineCode>
                        ))}
                    </Box>
                  ) : (
                    <InlineCode>{type.name}</InlineCode>
                  )}
                </Cell>
                <Cell>
                  {defaultValue ? (
                    <InlineCode>{defaultValue.value}</InlineCode>
                  ) : (
                    '-'
                  )}
                </Cell>
                <Cell>
                  {required ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : (
                    '-'
                  )}
                </Cell>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </Box>
  )
}
