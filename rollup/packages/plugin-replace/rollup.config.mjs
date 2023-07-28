import { defineConfig } from 'rollup'
import replace from '@rollup/plugin-replace'
import path from 'path'

export default defineConfig({
  input: './src/index.js',
  output: {
    dir: 'dist',
    format: 'esm',
  },
  plugins: [
    replace({
      preventAssignment: true,
      values: {
        'CURRENT_PATH': JSON.stringify(path.resolve().replace(/\\+/g, '/')),
      }
    })
  ]
})
