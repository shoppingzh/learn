const o1 = {
  valueOf() {
    return 1
  },
  toString() {
    return '3'
  }
}
const o2 = {
  valueOf() {
    return 1
  },
  toString() {
    return '2'
  }
}

const pairs = [
  [undefined, undefined],
  [null, null],
  [true, true],
  [true, false],
  [false, false],
  [1, 1],
  [NaN, NaN],
  [Infinity, NaN],
  [-0, +0],
  [Symbol.iterator, Symbol.iterator],
  [Symbol(), Symbol()],
  ['', ' '],
  ['1', '1'],
  [o1, o2],
  [[1], [1]],

  // undefined
  [undefined, null],
  [undefined, true],
  [undefined, false],
  [undefined, 1],
  [undefined, 0],
  [undefined, -0],
  [undefined, +0],
  [undefined, NaN],
  [undefined, Infinity],

  [undefined, Symbol.iterator],
  [undefined, ''],
  [undefined, ' '],
  [undefined, '1'],
  [undefined, 'false'],

  [undefined, {}],
  [undefined, { toString() { return undefined } }],
  [undefined, o1],

  // null
  [null, true],
  [null, false],
  [null, 1],
  [null, 0],
  [null, -0],
  [null, +0],
  [null, NaN],
  [null, Infinity],

  [null, Symbol.iterator],
  [null, ''],
  [null, ' '],
  [null, '1'],
  [null, 'false'],

  [null, {}],
  [null, { toString() { return null } }],
  [null, o1],

  // boolean
  [true, 1],
  [true, 0],
  [true, 2],
  [true, NaN],
  [false, NaN],
  [true, Infinity],
  [true, -0],
  [true, +0],
  [false, -0],
  [false, +0],
  [true, Symbol.iterator],
  [true, ''],
  [false, ''],
  [true, ' '],
  [false, ' '],
  [true, '0'],
  [true, '1'],
  [false, '0'],
  [false, '1'],
  [true, {}],
  [true, { toString() { return true } }],
  [true, { toString() { return 1 } }],
  [true, []],
  [false, []],
  [true, [1]],
  [false, [1]],
  [true, [0]],
  [false, [0]],
  [true, [0, 1]],
  [false, [0, 1]],

]

it('===', () => {
  const result = [
    true,
    true,
    true,
    false,
    true,
    true,
    false,
    false,
    true,
    true,
    false,
    false,
    true,
    false,
    false,

    // undefined
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,

    false,
    false,
    false,
    false,
    false,

    false,
    false,
    false,

    // null
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,

    false,
    false,
    false,
    false,
    false,

    false,
    false,
    false,

    // boolean
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]
  pairs.forEach((pair, index) => {
    const a = pair[0]
    const b = pair[1]
    expect(a === b).toBe(result[index])
  })
})

it('==', () => {
  const result = [
    true,
    true,
    true,
    false,
    true,
    true,
    false,
    false,
    true,
    true,
    false,
    false,
    true,
    false,
    false,

    // undefined
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,

    false,
    false,
    false,
    false,
    false,

    false,
    false, // 特别注意！
    false,

    // null
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,

    false,
    false,
    false,
    false,
    false,

    false,
    false, // 特别注意！
    false,

    // boolean
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    true,
    true,
    false,
    false,
    true,
    false,
    true,
    false,
    true,
    true,
    false,
    false,
    true,
    true,
    false,
    true,
    true,
    false,
    false,
    true,
    false,
    false,
  ]
  pairs.forEach((pair, index) => {
    console.log(pair)
    const a = pair[0]
    const b = pair[1]
    expect(a == b).toBe(result[index])
  })
})