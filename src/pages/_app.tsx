import { globalCss } from '@atom-learning/components'
import type { AppProps } from 'next/app'
import * as React from 'react'

globalCss({
  '*': { boxSizing: 'border-box' },
  body: { margin: 0 }
})()

const App: React.FC<AppProps> = ({ Component, pageProps }) => (
  <Component {...pageProps} />
)

export default App
