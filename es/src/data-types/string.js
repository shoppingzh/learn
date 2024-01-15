it('padStart', () => {
  expect('hello'.padStart(10)).toBe('     hello')
  expect('hello'.padEnd(8)).toBe('hello   ')
  expect('hello'.padStart(8, '/')).toBe('///hello')
  expect('hello'.padStart(4)).toBe('hello')
})

it('unicode', () => {
  expect('😄'.codePointAt(0)).toBe(128516)
})

it('template', () => {
  function rm(strings, ...exps) {
    return strings.join('')
  }
  expect(rm`hello${','} I'm ${'xp'}`).toBe('hello I\'m ' )
})

it('String.raw', () => {
  expect(String.raw`c:\1.txt`).toBe('c:\\1.txt')
})

it('original', () => {
  function original(strings, ...exps) {
    return strings.map((str, i) => {
      if (i > exps.length - 1) return str
      return str + exps[i]
    }).join('')
  }
  expect(original`abc, ${1}, xyz, ${2}, ${'hello'}, nice, ${undefined}`)
    .toBe(`abc, ${1}, xyz, ${2}, ${'hello'}, nice, ${undefined}`)
})