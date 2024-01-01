describe('', () => {

  // 直接调用，报错
  it('constructor', () => {
    expect(() => Set()).toThrow()
  })

  // -0将转为+0
  it('-0/+0', () => {
    const set = new Set()
    set.add(-0)
    set.add(+0)
    expect(set.size).toBe(1)
    for (let item of set) {
      expect(Object.is(item, +0)).toBeTruthy()
    }
  })

  // NaN === NaN
  it('NaN === NaN', () => {
    const set = new Set()
    set.add(NaN)
    set.add(NaN)
    set.add(NaN)
    expect(set.size).toBe(1)
  })

  // 查找性能，肯定比数组好
  it('insert', () => {
    const run = (collection) => {
      const max = 1000000
      const insert = collection.add || collection.push
      for (let i = 0; i < max; i++) {
        insert.call(collection, i)
      }
      const start = +new Date()
      const has = collection.has || collection.includes
      for (let i = 0;i < 100; i++) {
        has.call(collection, max - 1)
      }
      const use = +new Date() - start
      // console.log(use)
      return use
    }

    expect(
      run(new Set()) < run([])
    ).toBeTruthy()
  })

  // 迭代性能：未知
  it('iterate', () => {
    const doIterate = (collection) => {
      const start = +new Date()
      for (let i of collection) {}
      const use = +new Date() - start
      console.log(use)
      return use
    }
    const arr = new Array(1000000).fill(null).map((_, idx) => idx + 1)
    const set = new Set(arr)

    doIterate(arr)
    doIterate(set)
  })
  
})
