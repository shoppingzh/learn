import { defineConfig } from 'rollup'
import beep from '@rollup/plugin-beep'

export default defineConfig({
  input: './src/index.js',
  output: {
    dir: 'dist',
    format: 'umd',
    name: 'Lib'
  },
  plugins: [
    beep()
  ]
})
