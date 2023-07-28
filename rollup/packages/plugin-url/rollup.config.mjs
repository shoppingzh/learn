import { defineConfig } from 'rollup'
import url from '@rollup/plugin-url'
import html from '@rollup/plugin-html'

export default defineConfig({
  input: './src/index.js',
  output: {
    dir: 'dist',
    format: 'esm',
  },
  plugins: [
    url({
      limit: 0,
      destDir: 'dist',
      publicPath: './'
    }),
    html(),
  ]
})
