import { Icon, Link, Stack } from '@atom-learning/components'
import { ArrowRightTop } from '@atom-learning/icons'
import * as React from 'react'

type ExternalLinksProps = {
  homepage: string
  component: string
}

const accessRootComponent = (component: string) => {
  if (component.includes(',')) {
    return component.split(',')[0]
  }
  return component
}

const ExternalLink = ({ children, to }) => (
  <Link size="sm" href={to} target="_blank">
    {children} <Icon css={{ size: '0.75rem' }} is={ArrowRightTop} />
  </Link>
)

export const ExternalLinks: React.FC<ExternalLinksProps> = ({
  homepage,
  component
}) => (
  <Stack gap="3" css={{ mb: '$5' }}>
    <ExternalLink to={homepage}>View source</ExternalLink>
    <ExternalLink to="https://github.com/Atom-Learning/components/issues/new">
      Report an issue
    </ExternalLink>
    <ExternalLink to={`${homepage}/${accessRootComponent(component)}.mdx`}>
      Edit this page
    </ExternalLink>
  </Stack>
)