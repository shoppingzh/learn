import { readFileSync } from 'fs'

export function readLines(path: string): string[] {
  const content: string = readFileSync(path, { encoding: 'utf-8' })
  return content.replaceAll('\r\n', '\n').split(/\n/).filter(line => line.trim())
}
