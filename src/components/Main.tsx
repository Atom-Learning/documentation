import * as React from 'react'

import { Box } from '.'

export const Main: React.FC = ({ children }) => (
  <Box
    as="main"
    css={{
      flex: 1,
      maxWidth: 640,
      mx: 'auto',
      px: '$3',
      py: '$5'
    }}
  >
    {children}
  </Box>
)
