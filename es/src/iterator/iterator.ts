interface MyIteratorResult<T> {
  done: boolean
  value: T
}

interface MyIterator<T> {
  next: () => MyIteratorResult<T>
}

class ArrayIterator<T> implements MyIterator<T> {

  private arr: T[]
  private index: number = -1

  constructor(arr: T[]) {
    this.arr = arr
  }

  next(): MyIteratorResult<T> {
    const nextIndex = ++this.index
    const done = nextIndex >= this.arr.length
    return { done, value: done ? undefined : this.arr[nextIndex] }
  }

  [Symbol.iterator]() {
    return this
  }
}

it('base', () => {
  const arr = [1, 2, 3, 4, 5]
  const it = new ArrayIterator(arr)
  expect(it.next().value).toBe(1)
  expect(it.next().value).toBe(2)
  expect(it.next().value).toBe(3)
  expect(it.next().done).toBeFalsy()
  expect(it.next().value).toBe(5)
  expect(it.next().done).toBeTruthy()
})

it('for of', () => {
  const arr = [1, 2, 3, 4, 5]
  const it = new ArrayIterator(arr)
  const all: number[] = []
  for (let v of it) {
    all.push(v)
  }
  expect(arr).toEqual(all)
})


it('generator', () => {
  const it = new ArrayIterator([1, 2, 3, 4, 5])
  function * foo() {
    yield * it
  }
  const gen = foo()
  expect(gen.next().value).toBe(1)
  expect(gen.next().value).toBe(2)
  expect(gen.next().value).toBe(3)
  expect(gen.next().value).toBe(4)
  expect(gen.next().value).toBe(5)
  expect(gen.next().value).toBe(undefined)
})