import type { AppProps } from 'next/app'
import * as React from 'react'

import { Flex } from '../components'
import { css } from '../stitches.config'
import { getPages } from '../utilities'
import { Main, Navigation } from './layout'

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
