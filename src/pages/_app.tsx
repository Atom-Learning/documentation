import type { AppProps } from 'next/app'
import * as React from 'react'

import { css } from '../stitches.config'

css.global({
  body: { margin: 0 }
})()

const App: React.FC<AppProps> = ({ Component, pageProps }) => (
  <Component {...pageProps} />
)

export default App
