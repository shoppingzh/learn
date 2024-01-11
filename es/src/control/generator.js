it('base', () => {

  function * foo() {
    yield 1
    yield 2

    return 3
  }

  const it = foo()
  
  expect(it.next().value).toBe(1)
  expect(it.next().value).toBe(2)
  const step = it.next()
  expect(step.value).toBe(3)
  expect(step.done).toBeTruthy()

})

it('params', () => {
  function * foo() {
    let result = yield
    result = result ** 2
    yield result
    yield result ** 2
  }

  const it = foo()
  it.next()
  
  expect(it.next(3).value).toBe(9)
  expect(it.next().value).toBe(81)
})

it('yield *', () => {
  function * foo() {
    yield 1
    yield* bar(5)
  }
  function * bar(base) {
    let result = base ** 2
    const x = yield result
    yield x + result
  }

  const it = foo()
  expect(it.next().value).toBe(1)
  expect(it.next().value).toBe(25)
  expect(it.next(10).value).toBe(35)
  expect(it.next().done).toBeTruthy()
})

it('for of', () => {
  function * foo() {
    yield 2
    yield 3
    yield 5
    yield 100
  }

  const it = foo()
  const arr = []
  for (let x of it) {
    arr.push(x)
  }
  expect(arr).toEqual([2, 3, 5, 100])
})

it('destruct', () => {
  function * foo() {
    yield 2
    yield 3
    yield 5
    yield 100
  }
  const it = foo()
  expect([...it]).toEqual([2, 3, 5, 100])
})

it('async', async() => {
  async function wait(timeout) {
    return await new Promise(resolve => setTimeout(() => resolve(1), timeout))
  }

  const result = await wait(10)
  expect(result).toBe(1)
})
