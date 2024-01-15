it('base', async() => {
  const o = {
    value: 0,
    next() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            done: this.value >= 3,
            value: this.value >= 3 ? undefined : ++this.value,
          })
        }, 10)
      })
    },
    [Symbol.asyncIterator]() {
      return this
    }
  }
  const arr = []
  for await (const val of o) {
    arr.push(val)
  }
  expect(arr).toEqual([1, 2, 3])
})
