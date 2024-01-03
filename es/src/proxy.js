function proxyLogFunction(value) {
  return new Proxy(value, {
    async apply(func, thisArg, args) {
      const start = +new Date()
      const result = await func.apply(thisArg, args)
      console.log(`调用时间：${+new Date() - start}ms`)
      expect(1).toBe(1)
      return result
    }
  })
}

it('get', () => {
  let times = 0
  const proxy = new Proxy({
    a: 1
  }, {
    get(target, prop) {
      if (prop === 'times') return ++times
      return target[prop]
    }
  })

  expect(proxy.a).toBe(1)
  expect(proxy.times).toBe(1)
  expect(proxy.times).toBe(2)
  expect(proxy.times).toBe(3)
})

it('function', async() => {

  async function hello() {
    await new Promise(r => {
      setTimeout(() => {
        console.log('hello')
        r()
      }, 10)
    })
  }
  const proxyHello = proxyLogFunction(hello)
  await proxyHello()
})
