import { defineConfig } from 'rollup'
import commonjs from '@rollup/plugin-commonjs'

export default defineConfig({
  input: './src/index.js',
  output: {
    dir: 'dist',
    format: 'umd',
    name: 'Lib'
  },
  plugins: [
    commonjs()
  ]
})
