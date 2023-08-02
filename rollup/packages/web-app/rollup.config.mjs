import { defineConfig } from 'rollup'
import url from '@rollup/plugin-url'
import html from '@rollup/plugin-html'
import ts from '@rollup/plugin-typescript'
import serve from 'rollup-plugin-serve'
import replace from '@rollup/plugin-replace'
import fs from 'fs'
import postcss from 'rollup-plugin-postcss'
import path from 'path'

const isDev = process.env.NODE_ENV === 'development'

export default defineConfig({
  input: './src/index.ts',
  output: {
    dir: 'dist',
    format: 'umd',
    name: 'App',
    plugins: [
      
    ]
  },
  plugins: [
    ts(),
    isDev ? serve({
      open: true,
      contentBase: ['dist'],
      host: 'localhost',
    }) : false,
    replace({
      preventAssignment: true,
      values: {
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      }
    }),
    html({
      // template: () => {
      //   return fs.readFileSync('./src/index.html', { encoding: 'utf-8' })
      // }
    }),
    url({
      limit: 0,
      destDir: 'dist/static',
      publicPath: './static/',
      fileName: '[name].[hash][extname]',
    }),
    postcss({
      extract: true,
      config: {
        path: path.resolve(__dirname, './postcss.config.mjs')
      }
    }),
  ]
})
