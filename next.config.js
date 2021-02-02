const withMdxEnhanced = require('next-mdx-enhanced')

module.exports = withMdxEnhanced({
  extendFrontMatter: {
    process: (_, frontMatter) => ({
      id: frontMatter.__resourcePath.replace('.mdx', '')
    })
  }
})({
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx']
})
