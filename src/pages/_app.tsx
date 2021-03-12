import { globalCss } from '@atom-learning/components'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import * as React from 'react'
globalCss({
  '*': { boxSizing: 'border-box' },
  body: { margin: 0 }
})()

const App: React.FC<AppProps> = ({ Component, pageProps }) => (
  <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
    <Component {...pageProps} />
  </>
)

export default App
