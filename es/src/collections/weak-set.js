it('base', async() => {
  const set = new WeakSet()
  function add() {
    const o = {}
    set.add(o)
  }

  add()

  console.log(set); // 到此处，set已经空了，因为add函数执行后，对象被回收了
})