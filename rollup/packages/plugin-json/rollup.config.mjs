import { defineConfig } from 'rollup'
import json from '@rollup/plugin-json'

export default defineConfig({
  input: './src/index.js',
  output: {
    dir: 'dist',
    format: 'umd',
    name: 'Lib'
  },
  plugins: [
    json()
  ]
})
