import { defineConfig } from 'rollup'
import commonjs from '@rollup/plugin-commonjs'
import strip from '@rollup/plugin-strip'
import run from '@rollup/plugin-run'

export default defineConfig({
  input: './src/index.js',
  output: {
    dir: 'dist',
    format: 'cjs',
  },
  plugins: [
    commonjs(),
    strip(),
    run(),
  ]
})
