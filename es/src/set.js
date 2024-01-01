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



  
})
