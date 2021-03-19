import { Box } from '@atom-learning/components'
import * as React from 'react'

export const Main: React.FC = ({ children }) => (
  <Box
    as="main"
    css={{
      flex: 1,
      maxWidth: 640,
      mx: 'auto',
      px: '$3',
      pt: '$6',
      pb: '$5',
      width: '100%',
      when: {
        md: {
          pb: '$6'
        }
      }
    }}
  >
    {children}
  </Box>
)
