
async function foo() {
  const a = await new Promise(resolve => {
    setTimeout(() => resolve(1), 10)
  })
  const b = await new Promise(resolve => {
    setTimeout(() => resolve(2), 10)
  })
  return a + b
}

function * foo2() {
  const a = yield new Promise(resolve => {
    setTimeout(() => resolve(1), 10)
  })
  const b = yield new Promise(resolve => {
    setTimeout(() => resolve(2), 10)
  })
  return a + b
}

it('base', async() => {
  expect(await foo()).toBe(3)
})

it('genrator', () => {
  const it = foo2()
  expect(it.next().value.then).not.toBeUndefined()
})

it('generator + promise', (done) => {
  const it = foo2()
  it.next().value.then(a => {
    it.next(a).value.then(b => {
      expect(it.next(b).value).toBe(3)
      done()
    })
  })
})

function run(it) {
  return new Promise((resolve, reject) => {
    const doRun = (result) => {
      if (result.done) return resolve(result.value)
      Promise.resolve(result.value).then(val => {
        doRun(it.next(val))
      })
    }
    doRun(it.next())
  })
}

it('run async generator', async() => {
  const it = foo2()
  expect(await run(it)).toBe(3)
})

it('async-await factory', async() => {
  function factory(fn) {
    const steps = []
    const collectStep = (step) => {
      steps.push(step)
    }
    fn(collectStep)

    function * gen() {
      for (const step of steps) {
        yield step()
      }
    }

    return run(gen())
  }

  let result
  await factory((step) => {
    step(() => {
      return new Promise(resolve => {
        setTimeout(() => resolve(1), 10)
      }).then(res => result = res)
    })

    step(() => {
      return new Promise(resolve => {
        setTimeout(() => resolve(2), 10)
      }).then(res => result = res)
    })
  })

  expect(result).toBe(2)
})