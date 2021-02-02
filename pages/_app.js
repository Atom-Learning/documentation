import { MDXProvider } from '@mdx-js/react'
import { CodeBlock, Text } from '../components'
// import docgen from '@atom-learning/components/dist/docgen.json'
// import { Box } from '@atom-learning/components'
import { frontMatter as docs } from '../pages/**/*.mdx'

const components = {
  code: CodeBlock,
  h1: (props) => <Text {...props} css={{ fontSize: '$xl' }} />
  // PropsTable: ({ data }) => {
  //   const { props } = Object.values(docgen).find(
  //     ({ displayName }) => data.displayName === displayName
  //   )

  //   return (
  //     <table>
  //       <thead>
  //         <tr>
  //           <th>Name</th>
  //           <th>Required</th>
  //           <th>Type</th>
  //         </tr>
  //       </thead>
  //       {Object.entries(props).map(([key, value]) => {
  //         return (
  //           <tbody>
  //             <tr>
  //               <td>{key}</td>
  //               <td>{value.required.toString()}</td>
  //               <td>{value.tsType.name}</td>
  //             </tr>
  //           </tbody>
  //         )
  //       })}
  //     </table>
  //   )
  // }
}

const App = ({ Component, pageProps }) => {
  return (
    <MDXProvider components={components}>
      <nav>
        {docs.map((page) => (
          <a href={`/${page.id}`}>{page.title}</a>
        ))}
      </nav>
      <main>
        <Component {...pageProps} />
      </main>
    </MDXProvider>
  )
}

export default App
