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