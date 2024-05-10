import { defineConfig } from 'rollup'
import html from '@rollup/plugin-html'
import fs from 'fs'

export default defineConfig({
  input: './src/index.js',
  output: {
    dir: 'dist',
    format: 'esm',
  },
  plugins: [
    html({
      title: 'Hello',
      attributes: {
        html: { lang: 'zh_CN' },
      },
      fileName: 'hello.html',
      meta: [{ icon: 'hello' }, { a: 'b' }],
      // template: (data) => {
      //   console.log(data.files);
      //   return fs.readFileSync('./src/template.html', { encoding: 'utf-8' })
      // }
    })
  ]
})
