import pdfjs from 'pdfjs-dist'
import fs from 'fs'

const buffer = fs.readFileSync('./1.pdf')

let html = ``

;(async() => {

  const pdf = await pdfjs.getDocument(new Uint8Array(buffer)).promise

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i)
    
    const content = await page.getTextContent({
      includeMarkedContent: true,
    })
    // const tree = await page.getStructTree()
    console.log(content);
    // content.items.forEach(o => {
    //   console.log(o.str);
    //   html += o.str
    // })
  }

  fs.writeFileSync('./result.txt', html)
})()
