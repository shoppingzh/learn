import { defineConfig } from 'rollup'
import dataUri from '@rollup/plugin-data-uri'

export default defineConfig({
  input: './src/index.js',
  output: {
    dir: 'dist',
    format: 'esm',
  },
  plugins: [
    dataUri()
  ]
})
