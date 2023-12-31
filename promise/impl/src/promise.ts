type ResolveFn<T> = (value: T) => void
type RejectFn<T> = (reason: any) => void
type Executor<T> = (resolve: ResolveFn<T>, reject: RejectFn<T>) => void
type OnFulfilled<T> = (value: T) => any // TODO 改进
type OnRejected<T> = (reason: any) => any // TODO 改进

type State = 'pending' | 'fulfilled' | 'rejected'

interface ThenInfo<T> {
  promise: MyPromise<T>
  onFulfilled: OnFulfilled<T>
  onRejected: OnRejected<T>
}

function isFunction(val: any) {
  return val && typeof val === 'function'
}

export default class MyPromise<T> {

  protected state: State = 'pending'
  protected result: any
  protected resolve: ResolveFn<T>
  protected reject: RejectFn<T>

  // private chainPromiseList: MyPromise<unknown>[] = []

  private thenInfoList: ThenInfo<unknown>[] = []

  constructor(executor?: Executor<T>) {
    this.resolve = (value: T) => {
      if (this.state !== 'pending') return
      const resolve = (value: T) => {
        this.result = value
        this.state = 'fulfilled'
        this.thenChain()
      }

      MyPromise.resolvePromise(this, value, resolve, this.reject)
    }
    this.reject = (reason: any) => {
      if (this.state !== 'pending') return
      this.result = reason
      this.state = 'rejected'
      this.thenChain()
    }
    if (executor) {
      try {
        executor(this.resolve, this.reject)
      } catch (err) {
        this.reject(err)
      }
    }
  }

  private thenChain(index?: number) {
    const list = !index ? this.thenInfoList : this.thenInfoList.slice(index, index + 1)
    list.forEach(({ onFulfilled, onRejected, promise }) => {
      if (this.state === 'pending') return
      const resolve = promise.resolve
      const reject = promise.reject
      try {
        if (this.state === 'fulfilled') {
          if (onFulfilled && isFunction(onFulfilled)) {
            queueMicrotask(() => {
              try {
                const value = onFulfilled(this.result)
                MyPromise.resolvePromise(promise, value, resolve, reject)
              } catch (err) {
                reject(err)
              }
            })
          } else {
            resolve(this.result)
          }
        } else if (this.state === 'rejected') {
          if (onRejected && isFunction(onRejected)) {
            queueMicrotask(() => {
              try {
                const x = onRejected(this.result)
                MyPromise.resolvePromise(promise, x, resolve, reject)
              } catch (err) {
                reject(err)
              }
            })
          } else {
            reject(this.result)
          }
        }
      } catch (err) {
        reject(err)
      }
    })
  }

  public then(onFulfilled?: OnFulfilled<T>, onRejected?: OnRejected<T>) {
    const nextPromise = new MyPromise()

    this.thenInfoList.push({
      promise: nextPromise,
      onFulfilled,
      onRejected,
    })

    if (this.state !== 'pending') {
      this.thenChain(this.thenInfoList.length - 1)
    }

    return nextPromise
  }
  

  private static resolvePromise<T>(promise: MyPromise<T>, x: any, resolve: ResolveFn<T>, reject: RejectFn<T>) {
    if (promise === x) {
      throw new TypeError('promise is equal to x')
    }
    // 处理的值本身是Promise，继承此Promise的状态
    if (x instanceof MyPromise) {
      if (x.state === 'pending') {
        x.then(resolve, reject)
      } else if (x.state === 'fulfilled') {
        resolve(x.result)
      } else if (x.state === 'rejected') {
        reject(x.result)
      }
      return
    }

    // 处理的值是一个thenable，
    if (x != null && (typeof x === 'object' || isFunction(x))) {
      let called = false
      try {
        const then = x.then
        if (!isFunction(then)) return resolve(x)

        // 为什么不使用x.then？防止多次调用x的getter造成副作用
        then.call(x, (y: any) => {
          if (called) return
          MyPromise.resolvePromise(promise, y, resolve, reject)
          called = true
        }, (err: any) => {
          if (called) return
          reject(err)
          called = true
        })
      } catch (err) {
        if (called) return
        reject(err)
      }
      return
    }

    resolve(x)
  }


}
