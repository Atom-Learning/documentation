import {
  Box,
  Flex,
  Heading,
  Icon,
  Link,
  styled,
  Text,
  Tooltip
} from '@atom-learning/components'
import docgen from '@atom-learning/components/dist/docgen.json'
import { Ok } from '@atom-learning/icons'
import * as React from 'react'
import { ComponentDoc } from 'react-docgen-typescript'

import { InlineCode } from '.'

type PropsTableProps = {
  for: string
}

const columns = ['Prop', 'Type', 'Default', 'Required']

const Table = styled('table', {
  borderCollapse: 'collapse',
  width: '100%'
})
const Cell = styled('td', {
  borderBottom: '1px solid $tonal300',
  color: '$tonal700',
  fontFamily: '$sans',
  fontSize: '$sm',
  pr: '$3',
  py: '$3',
  textAlign: 'left',
  verticalAlign: 'middle',
  variants: {
    appearance: {
      heading: {
        color: '$tonal800',
        fontWeight: 700,
        whiteSpace: 'nowrap'
      }
    }
  }
})

const Empty = () => <Text css={{ color: '$tonal500' }}>-</Text>

const TooltipLink = ({ children, content, ...rest }) => (
  <Tooltip>
    <Tooltip.Trigger>
      <Link size="sm" {...rest}>
        {children}
      </Link>
    </Tooltip.Trigger>
    <Tooltip.Content
      css={{
        width: '90vw',
        textAlign: 'center',
        lineHeight: 1.4,
        letterSpacing: '0.01em',
        fontSize: '$sm'
      }}
    >
      {content}
    </Tooltip.Content>
  </Tooltip>
)

const PropType = ({ name, type }) => {
  if (name === 'css') {
    return (
      <TooltipLink
        href="https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react/v16/index.d.ts#L1547"
        content="Override the component styles. Supports tokens, media queries and all stitches features"
      >
        <InlineCode>CSSProperties</InlineCode>
      </TooltipLink>
    )
  }
  if (name === 'as') {
    return (
      <TooltipLink
        href="https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react/v16/index.d.ts#L2993"
        content="Change the component to a different HTML tag or custom component"
      >
        <InlineCode>JSX.IntrinsicElements</InlineCode>
      </TooltipLink>
    )
  }
  if (Array.isArray(type.value)) {
    const values = type.value
      .filter(({ value }) => value !== 'undefined')
      .filter(({ value }) => !value.startsWith('{ [x: string]'))
    return (
      <Flex css={{ gap: '$2', flexWrap: 'wrap' }}>
        {values.map(({ value }, index) => (
          <React.Fragment key={value}>
            <InlineCode key={value}>{value}</InlineCode>
            {index < values.length - 1 && ' | '}
          </React.Fragment>
        ))}
      </Flex>
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
      <Heading as="h2" css={{ mb: '$3' }}>
        API Reference
      </Heading>
      <Box css={{ overflow: 'auto' }}>
        <Table>
          <thead>
            <tr>
              {columns.map((column) => (
                <Cell
                  as="th"
                  appearance="heading"
                  key={column}
                  css={
                    ((column === 'Default' || column === 'Required') && {
                      width: 74
                    }) ||
                    (column === 'Prop' && {
                      width: '20%'
                    })
                  }
                >
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
                    <Cell>
                      {required && name !== 'as' && name !== 'css' ? (
                        <Icon is={Ok} size="sm" />
                      ) : (
                        <Empty />
                      )}
                    </Cell>
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
