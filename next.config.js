const withMdxEnhanced = require('next-mdx-enhanced')

module.exports = withMdxEnhanced({
  extendFrontMatter: {
    process: (_, frontMatter) => ({
      id: frontMatter.__resourcePath.replace('.mdx', '')
    })
  }
})({
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  async redirects() {
    return [
      {
        source: '/',
        destination: '/overview/introduction',
        permanent: true
      }
    ]
  }
})
