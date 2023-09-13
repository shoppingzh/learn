import Pdfparser from "pdf2json"
import fs from 'fs'

const parser = new Pdfparser()


parser.on('pdfParser_dataReady', data => {
  fs.writeFileSync('./result.json', JSON.stringify(data, null, 4))
})

parser.loadPDF('./1.pdf')
