it('base', () => {
  
  const map = new Map()
  const key1 = {}
  const key2 = []
  map.set(1, 10)
  map.set('2', 'hello')
  map.set(Symbol.iterator, [])
  map.set(key1, 'object')
  map.set(key2, 'array')

  expect(map.size).toBe(5)

  map.delete(Symbol.iterator)
  expect(map.size).toBe(4)

  expect(map.get(key2)).toBe('array')

  expect([...map.keys()]).toEqual([1, '2', key1, key2])
  expect([...map.values()]).toEqual([10, 'hello', 'object', 'array'])
})

it('plain object 1', () => {

  const map = new Map()
  const oMap = {}
  const oMap2 = Object.create(null)

  expect(map.get('constructor')).toBeUndefined()
  expect(oMap['constructor']).not.toBeUndefined() // 意外获取到原型链上的属性
  expect(oMap2['constructor']).toBeUndefined() // 改善方法：消除原型链
})

it('plain object 2', () => {
  const key = 'constructor'
  const map = new Map()
  const oMap = {}
  const oMap2 = {}
  const oMap3 = Object.create(null)

  map.set(key, 1)
  oMap[key] = 1
  oMap2[key] = 1

  expect(map.get(key)).not.toBeUndefined()
  expect(oMap[key]).not.toBeUndefined()
  expect(oMap2[key]).not.toBeUndefined() // 没有设值，却意外获取到原型链上的元素
  expect(oMap3[key]).toBeUndefined() // 改善方法：消除原型链
})