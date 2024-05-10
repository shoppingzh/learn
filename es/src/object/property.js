it('get/set', () => {
  const p = {
    a: 'p-a'
  }
  Object.defineProperty(p, 'b', {
    value: 'p-b',
    writable: true
  })
  Object.defineProperty(p, 'c', {
    value: 'p-c',
    writable: false,
  })
  let pd
  Object.defineProperty(p, 'd', {
    get() {
      return pd
    },
    set(newVal) {
      pd = newVal
    }
  })

  const o = Object.create(p)
  
  expect(o.a).toBe('p-a')

  o.a = 'o-a'
  expect(o.a).toBe('o-a')

  o.b = 'o-b'
  expect(o.b).toBe('o-b')

  o.c = 'o-c'
  expect(o.c).toBe('p-c')

  o.d = 'o-d'
  expect(o.d).toBe('o-d')
  expect(p.d).toBe('o-d')
  expect(Object.getOwnPropertyDescriptor(o, 'd')).toBeUndefined()

})