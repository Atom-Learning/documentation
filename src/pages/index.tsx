import * as React from 'react'

import { getAllPages } from '../utilities'

const Index: React.FC<{
  pages: {
    components: {
      id: string
      path: string
      data: {
        id: string
        title: string
      }
    }[]
    // theme: {
    //   id: string
    //   path: string
    //   data: {
    //     id: string
    //     title: string
    //   }
    // }[]
  }
}> = ({ pages }) => {
  return (
    <aside>
      <nav>
        <h3>Components</h3>
        <ul>
          {pages.components.map((page) => (
            <li key={page.data.id}>
              <a href={`/page/${page.id}`}>{page.data.title}</a>
            </li>
          ))}
        </ul>
        {/* <h3>Theme</h3>
        <ul>
          {pages.theme.map((page) => (
            <li key={page.id}>
              <a href={`/page/${page.id}`}>{page.data.title}</a>
            </li>
          ))}
        </ul> */}
      </nav>
    </aside>
  )
}

export async function getStaticProps() {
  const pages = await getAllPages()

  console.log({ pages })

  return {
    props: {
      pages
    }
  }
}

export default Index
