import { defineConfig } from 'rollup'
import run from '@rollup/plugin-run'

export default defineConfig({
  input: './src/index.js',
  output: {
    dir: 'dist',
    format: 'esm',
  },
  plugins: [
    run({})
  ]
})
