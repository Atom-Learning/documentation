import * as React from 'react'

import { CodeBlock } from './CodeBlock'

type ScaleProps = {
  data: string
}

export const Embed: React.FC<ScaleProps> = ({ data }) => (
  <CodeBlock>{data}</CodeBlock>
)
