
async function foo() {
  console.log(0)
  const res1 = await new Promise(resolve => {
    setTimeout(() => resolve(1), 3000)
  })
  console.log(res1);
  const res2 = await new Promise(resolve => {
    setTimeout(() => resolve(2), 1000)
  })
  console.log(res2);
}

// 等同于：Promise链
function foo2() {
  return new Promise((resolve, reject) => {
    console.log(0)
    new Promise(resolve => {
      setTimeout(() => resolve(1), 3000)
    }).then(res1 => {
      console.log(res1)
      new Promise(resolve => {
        setTimeout(() => resolve(2), 1000)
      }).then(res2 => {
        console.log(res2)
        resolve()
      })
    })
  })
}

// 优化Promise链：使用Genrator + Promise模拟
function foo3() {

  function * gen() {
    console.log(0)
    yield new Promise(resolve => {
      setTimeout(() => resolve(1), 3000)
    }).then(res1 => console.log(res1))
    yield new Promise(resolve => {
      setTimeout(() => resolve(2), 1000)
    }).then(res2 => console.log(res2))
  }


  const it = gen()

  function run(item) {
    if (item.done) return
    item.value.then(() => {
      run(it.next())
    })
  }

  run(it.next())
}


// foo()
// foo2()
// foo3()

// 抽取
function asyncAwait(fn) {
  const steps = []

  fn((stepFn) => {
    steps.push(stepFn)
  })

  function * gen() {
    while (steps.length) {
      const stepFn = steps.shift()
      if (stepFn) {
        yield Promise.resolve(stepFn())
      }
    }
  }
  
  return new Promise(resolve => {
    const it = gen()
  
    function run(item) {
      if (item.done) return resolve()
      item.value.then(() => {
        run(it.next())
      })
    }
  
    run(it.next())
  })
}


it('impl', (done) => {
  const steps = []
  asyncAwait(await => {
    console.log(0)
  
    await(() => {
      steps.push(1)
      console.log('第一步')
      return new Promise(resolve => {
        setTimeout(() => resolve(1), 10)
      })
    })
    await((res) => {
      steps.push(2)
      console.log('第二步')
      return new Promise(resolve => {
        setTimeout(() => resolve(2), 20)
      })
    })
    await(res2 => {
      steps.push(3)
      console.log('第三步')
    })
  
  }).then(() => {
    expect(steps).toEqual([1, 2, 3])
    done()
  })
  
})