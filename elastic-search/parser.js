import pdfjs from 'pdfjs-dist'
import fs from 'fs'

export function parse(filepath) {
  return new Promise(async(resolve, reject) => {
    const buffer = fs.readFileSync('./1.pdf')

    const pdf = await pdfjs.getDocument(new Uint8Array(buffer)).promise
    let all = ''
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i)
  
      const content = await page.getTextContent({
        includeMarkedContent: true,
      })
      content.items.forEach((o) => {
        all += o.str
      })

    }
    resolve(all)
  })

}
