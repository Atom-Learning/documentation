import { MDXProvider } from '@mdx-js/react'
import { CodeBlock } from '../components/CodeBlock'
import docgen from '@atom-learning/components/dist/docgen.json'
import { Box } from '@atom-learning/components'

const components = {
  code: CodeBlock,
  h1: (props) => (
    <Box css={{ color: '$primary500' }}>
      <h1 {...props} />
    </Box>
  ),
  PropsTable: ({ data }) => {
    const { props } = Object.values(docgen).find(
      ({ displayName }) => data.displayName === displayName
    )

    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Required</th>
            <th>Type</th>
          </tr>
        </thead>
        {Object.entries(props).map(([key, value]) => {
          return (
            <tbody>
              <tr>
                <td>{key}</td>
                <td>{value.required.toString()}</td>
                <td>{value.tsType.name}</td>
              </tr>
            </tbody>
          )
        })}
      </table>
    )
  }
}

const App = ({ Component, pageProps }) => {
  return (
    <MDXProvider components={components}>
      <Component {...pageProps} />
    </MDXProvider>
  )
}

export default App
