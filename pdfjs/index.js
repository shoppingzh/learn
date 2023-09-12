import pdfjs from 'pdfjs-dist'
import fs from 'fs'

const buffer = fs.readFileSync('./1.pdf')

;(async() => {

  const pdf = await pdfjs.getDocument(new Uint8Array(buffer)).promise

  console.log(pdf.numPages)

})()