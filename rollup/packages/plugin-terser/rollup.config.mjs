import { defineConfig } from 'rollup'
import nodeResolve from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'
import run from '@rollup/plugin-run'
import commonjs from '@rollup/plugin-commonjs'

export default defineConfig({
  input: './src/index.js',
  output: {
    dir: 'dist',
    format: 'esm',
  },
  plugins: [
    commonjs(),
    nodeResolve(),
    terser(),
    run(),
  ]
})
