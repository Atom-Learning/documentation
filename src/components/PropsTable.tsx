import {
  Box,
  Check,
  Heading,
  Icon,
  Link,
  styled,
  Text
} from '@atom-learning/components'
import docgen from '@atom-learning/components/dist/docgen.json'
import * as React from 'react'
import { ComponentDoc } from 'react-docgen-typescript'

import { InlineCode } from '.'

type PropsTableProps = {
  for: string
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

const Empty = () => <Text css={{ color: '$tonal500' }}>-</Text>

const PropType = ({ name, type }) => {
  if (name === 'css') {
    return (
      <Link href="https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react/v16/index.d.ts#L1547">
        <InlineCode>"CSSProperties"</InlineCode>
      </Link>
    )
  }
  if (name === 'as') {
    return (
      <Link href="https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react/v16/index.d.ts#L2993">
        <InlineCode>"JSX.IntrinsicElements"</InlineCode>
      </Link>
    )
  }
  if (Array.isArray(type.value)) {
    return (
      <Box css={{ display: 'flex', gap: '$2', flexWrap: 'wrap' }}>
        {type.value
          .filter(({ value }) => value !== 'undefined')
          .map(({ value }) => (
            <InlineCode key={value}>{value}</InlineCode>
          ))}
      </Box>
    )
  }
  return <InlineCode>{type.name}</InlineCode>
}

export const PropsTable: React.FC<PropsTableProps> = ({
  for: componentName
}) => {
  const componentDocs: ComponentDoc = docgen.find(
    (component) => component.displayName === componentName
  )

  if (!componentDocs) {
    return null
  }

  return (
    <Box css={{ mt: '$5' }}>
      <Heading as="h2">API Reference</Heading>
      <Box css={{ overflow: 'auto' }}>
        <Table>
          <thead>
            <tr>
              {columns.map((column) => (
                <Cell as="th" appearance="heading" key={column}>
                  {column}
                </Cell>
              ))}
            </tr>
          </thead>
          <tbody>
            {Object.entries(componentDocs.props).map(
              ([key, { name, type, defaultValue, required }]) => {
                if (type.name === 'never') return null

                return (
                  <tr key={key}>
                    <Cell css={{ pr: '$4' }}>
                      <InlineCode>{name}</InlineCode>
                    </Cell>
                    <Cell>
                      <PropType name={name} type={type} />
                    </Cell>
                    <Cell>
                      {defaultValue ? (
                        <InlineCode>{defaultValue.value}</InlineCode>
                      ) : (
                        <Empty />
                      )}
                    </Cell>
                    <Cell>{required ? <Icon is={Check} /> : <Empty />}</Cell>
                  </tr>
                )
              }
            )}
          </tbody>
        </Table>
      </Box>
    </Box>
  )
}
