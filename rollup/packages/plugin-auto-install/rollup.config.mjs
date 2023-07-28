import { defineConfig } from 'rollup'
import auto from '@rollup/plugin-auto-install'

export default defineConfig({
  input: './src/index.js',
  output: {
    dir: 'dist',
    format: 'umd',
    name: 'Lib'
  },
  plugins: [
    auto()
  ]
})
