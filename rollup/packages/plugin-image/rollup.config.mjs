import { defineConfig } from 'rollup'
import image from '@rollup/plugin-image'

export default defineConfig({
  input: './src/index.js',
  output: {
    dir: 'dist',
    format: 'esm',
  },
  plugins: [
    image({
      dom: true,
    })
  ]
})
