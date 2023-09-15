import fs from 'fs'
import { parse } from './parser.js'


;(async() => {

  const html = await parse('./1.pdf')

  fs.writeFileSync('./result.txt', html, { encoding: 'utf-8' })
})()
