it('padStart', () => {
  expect('hello'.padStart(10)).toBe('     hello')
  expect('hello'.padEnd(8)).toBe('hello   ')
  expect('hello'.padStart(8, '/')).toBe('///hello')
  expect('hello'.padStart(4)).toBe('hello')
})

it('unicode', () => {
  expect('😄'.codePointAt(0)).toBe(128516)
})
