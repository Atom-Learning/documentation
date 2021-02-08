import type { AppProps } from 'next/app'
import * as React from 'react'

import { Flex } from '../components'
import { Main, Navigation } from '../components/layout'
import { css } from '../stitches.config'
import { getPages } from '../utilities'

css.global({
  body: { margin: 0 }
})()

const App: React.FC<AppProps> = ({ Component, pageProps }) => (
  <Flex>
    <Navigation items={getPages()} />
    <Main>
      <Component {...pageProps} />
    </Main>
  </Flex>
)

export default App
