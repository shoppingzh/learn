it('includes', () => {

  const arr = []
  arr.push(1 / '二')

  expect(arr.indexOf(NaN) >= 0).toBeFalsy()
  expect(arr.includes(NaN)).toBeTruthy() // includes api解决了NaN无法被找到的问题

})

