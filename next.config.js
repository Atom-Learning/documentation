const withPlugins = require('next-compose-plugins')
const withMdxEnhanced = require('next-mdx-enhanced')
const withTM = require('next-transpile-modules')(['@atom-learning/components']) // pass the modules you would like to see transpiled

module.exports = withPlugins([
  withTM,
  withMdxEnhanced({
    extendFrontMatter: {
      process: (_, frontMatter) => ({
        id: frontMatter.__resourcePath.replace('.mdx', '')
      })
    }
  })({
    pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx']
  })
])
