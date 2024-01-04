it('to-primitive', () => {

  expect('1' + {}).toBe('1[object Object]')
  expect('1' + {
    toString() {
      return '2'
    }
  }).toBe('12')
  expect('1' + {
    valueOf() {
      return '3'
    }
  }).toBe('13')

  expect(Number('1' + new Date())).toBe(NaN) // Date不是number偏好

})

it('to-boolean', () => {

  const falsyList = [undefined, null, '', +0, -0, NaN, 0n]
  falsyList.forEach(falsy => {
    expect(!falsy).toBeTruthy()
  })

  const truthyList = [{}, [], '0', 'false']
  truthyList.forEach(truthy => {
    expect(!truthy).toBeFalsy()
  })

})

it('to-number', () => {
  expect(1 - undefined).toBe(NaN)
  expect(1 - null).toBe(1)
  expect(1 - true).toBe(0)
  expect(1 - false).toBe(1)
  expect(() => 1 - Symbol()).toThrow()
  expect(1 - '').toBe(1)
  expect(1 - '1').toBe(0)
  expect(1 - 'Infinity').toBe(-Infinity)
  expect(1 - [1]).toBe(0)
})

it('to-string', () => {
  expect('' + undefined).toBe('undefined')
  expect('' + null).toBe('null')
  expect('' + true).toBe('true')
  expect('' + false).toBe('false')
  expect('' + 1).toBe('1')
  expect('' + 0).toBe('0')
  expect('' + -0).toBe('0')
  expect('' + Infinity).toBe('Infinity')
  expect('' + NaN).toBe('NaN')
  expect('' + 1n).toBe('1')
  expect(() => '' + Symbol()).toThrow() // 特别注意：String(Symbol()) -> 'Symbol()'
  expect('' + {}).toBe('[object Object]')
  expect('' + []).toBe('')
})