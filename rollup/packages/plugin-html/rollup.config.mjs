import { defineConfig } from 'rollup'
import html from '@rollup/plugin-html'

export default defineConfig({
  input: './src/index.js',
  output: {
    dir: 'dist',
    format: 'esm',
  },
  plugins: [
    html({})
  ]
})
