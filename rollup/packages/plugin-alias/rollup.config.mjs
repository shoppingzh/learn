import { defineConfig } from 'rollup'
import alias from '@rollup/plugin-alias'
import path from 'path'

export default defineConfig({
  input: './src/index.js',
  output: {
    dir: 'dist',
    format: 'esm',
  },
  plugins: [
    alias({
      entries: {
        '@': path.resolve(__dirname, './src')
      }
    })
  ]
})
