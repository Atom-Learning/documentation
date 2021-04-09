import {
  Box,
  CSS,
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
import { pascalCase } from 'pascal-case'
import * as React from 'react'
import { ComponentDoc } from 'react-docgen-typescript'

import { InlineCode } from '.'

type PropsTableProps = {
  for: string
}

const getComponentProps = (name): ComponentDoc =>
  docgen
    .filter(Boolean)
    .find((component) => component.displayName === pascalCase(name))

const columns = ['Prop', 'Type', 'Default', 'Required']

const Table = styled('table', {
  borderCollapse: 'collapse',
  width: '100%'
})
const Cell = styled('td', {
  borderBottom: '1px solid $tonal300',
  color: '$tonal700',
  fontSize: '$sm',
  fontFamily: '$sans',
  py: '$3',
  pr: '$3',
  textAlign: 'left',
  verticalAlign: 'middle',
  variants: {
    appearance: {
      heading: {
        color: '$tonal800',
        fontFamily: '"Inter"',
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
      <Link
        size="sm"
        href="https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react/v16/index.d.ts#L1547"
      >
        <InlineCode>"CSSProperties"</InlineCode>
      </Link>
    )
  }
  if (name === 'as') {
    return (
      <Link
        size="sm"
        href="https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react/v16/index.d.ts#L2993"
      >
        <InlineCode>"JSX.IntrinsicElements"</InlineCode>
      </Link>
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

const WithTooltip = ({ children, content }) => (
  <Flex
    css={{
      alignItems: 'center'
    }}
  >
    {children}
    <Tooltip>
      <Tooltip.Trigger>
        <Flex
          css={{
            alignItems: 'center',
            bg: '$tonal600',
            borderRadius: '$round',
            color: 'white',
            cursor: 'pointer',
            fontFamily: '$mono',
            fontSize: '8px',
            fontWeight: 'bold',
            justifyContent: 'center',
            ml: '$2',
            size: '14px'
          }}
        >
          i
        </Flex>
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
  </Flex>
)

const TableProps: React.FC<{ css?: CSS; component: ComponentDoc }> = ({
  css,
  component
}) => (
  <Box css={{ overflow: 'auto', ...(css as any) }}>
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
                (column === 'Prop' && { width: '30%' })
              }
            >
              {column}
            </Cell>
          ))}
        </tr>
      </thead>
      <tbody>
        {Object.entries(component.props).map(
          ([key, { name, type, defaultValue, required }]) => {
            console.log({ defaultValue })

            if (type.name === 'never') return null

            return (
              <tr key={key}>
                <Cell css={{ pr: '$4' }}>
                  {name === 'as' ? (
                    <WithTooltip content="Change the component to a different HTML tag or custom component">
                      <InlineCode css={{ cursor: 'pointer' }}>
                        {name}
                      </InlineCode>
                    </WithTooltip>
                  ) : name === 'css' ? (
                    <WithTooltip content="Override the component styles. Supports tokens, media queries and all stitches features">
                      <InlineCode css={{ cursor: 'pointer' }}>
                        {name}
                      </InlineCode>
                    </WithTooltip>
                  ) : (
                    <InlineCode>{name}</InlineCode>
                  )}
                </Cell>
                <Cell>
                  <PropType name={name} type={type} />
                </Cell>
                <Cell>
                  {defaultValue && defaultValue?.value !== 'undefined' ? (
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
)

export const PropsTable: React.FC<PropsTableProps> = ({
  for: componentName
}) => {
  if (componentName.includes(',')) {
    return (
      <Box css={{ mt: '$5' }}>
        <Heading as="h2" css={{ mb: '$4', color: '$tonal900' }}>
          API Reference
        </Heading>
        {componentName.split(',').map((component) => {
          const componentProps = getComponentProps(component)
          if (!componentProps) return null
          return (
            <React.Fragment key={component}>
              <Heading as="h3" size="sm" css={{ mb: '$3' }}>
                {component}
              </Heading>
              <TableProps
                component={componentProps}
                css={{ mb: '$5', color: '$tonal900' }}
              />
            </React.Fragment>
          )
        })}
      </Box>
    )
  }

  const componentProps = getComponentProps(componentName)
  if (!componentProps) return null

  return (
    <Box css={{ mt: '$5' }}>
      <Heading as="h2" css={{ mb: '$3' }}>
        API Reference
      </Heading>
      <TableProps component={componentProps} />
    </Box>
  )
}
