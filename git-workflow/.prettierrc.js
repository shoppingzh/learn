/** @type {import('prettier').Config} */
module.exports = {
  parser: 'typescript',

  printWidth: Number.MAX_SAFE_INTEGER,
  useTabs: false,
  tabWidth: 2,

  semi: false,
  singleQuote: true,
  trailingComma: 'all',
  endOfLine: 'auto',
  quoteProps: 'consistent',
}
