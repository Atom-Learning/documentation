import { MDXProvider } from '@mdx-js/react'
import Link from 'next/link'
import * as React from 'react'

import { Box, CodeBlock, Flex, Text } from '../components'
import { frontMatter as pages } from '../pages/**/*.mdx'
import { css } from '../stitches.config'

css.global({
  body: { margin: 0 }
})()

const components = {
  h1: (props) => <Text {...props} size="xl" as="h1" />,
  h2: (props) => <Text {...props} size="lg" as="h2" />,
  h3: (props) => <Text {...props} css={{ fontWeight: 600 }} as="h3" />,
  p: (props) => <Text {...props} css={{ color: '$tonal800' }} />,
  ul: (props) => <Text {...props} as="ul" />,
  code: CodeBlock
}

console.log({ pages })

const App: React.FC = ({ Component, pageProps }) => (
  <Flex>
    <Box
      as="nav"
      css={{
        position: 'sticky',
        top: 0,
        p: '$3',
        borderRight: '1px solid $tonal300',
        width: 200
      }}
    >
      <Text size="lg">Atom Learning Design System</Text>
      <Box as="ul">
        {pages.map((page) => (
          <Box as="li" key={page.id}>
            <Link href={page.id === 'index' ? '/' : `/${page.id}`}>
              {page.title}
            </Link>
          </Box>
        ))}
      </Box>
    </Box>
    <Box
      as="main"
      css={{
        maxWidth: 600,
        mx: 'auto',
        flex: 1,
        py: '$4',
        px: '$3'
      }}
    >
      <MDXProvider components={components}>
        <Component {...pageProps} />
      </MDXProvider>
    </Box>
  </Flex>
)

export default App
