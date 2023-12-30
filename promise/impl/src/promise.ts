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

  constructor(executor: Executor<T>) {
    if (!executor) throw new Error('executor为空')
    try {
      this.resolve = (value: T) => {
        if (this.state === 'pending') return
        this.state = 'fulfilled'
        this.result = value
        this.run()
      }
      this.reject = (reason: any) => {
        if (this.state !== 'pending') return
        this.result = reason
        this.state = 'rejected'
        this.run()
      }
      executor(this.resolve, this.reject)
    } catch (err) {
      this.reject(err)
    }
  }

  private run(index?: number) {
    const list = !index ? this.thenInfoList : this.thenInfoList.slice(index, index + 1)
    list.forEach(({ onFulfilled, onRejected, promise }) => {
      const resolve = promise.resolve
      const reject = promise.reject
      try {
        if (this.state === 'fulfilled') {
          if (onFulfilled) {
            if (!isFunction(onFulfilled)) {
              return resolve(this.result)
            }
            const value = onFulfilled(this.result)
            MyPromise.resolvePromise(promise, value, resolve, reject)
          }
        } else if (this.state === 'rejected') {
          if (onRejected) {
            if (!isFunction(onRejected)) {
              return reject(this.result)
            }
            const x = onRejected(this.result)
            MyPromise.resolvePromise(promise, x, resolve, reject)
          }
        }
      } catch (err) {
        reject(err)
      }
    })
  }

  public then(onFulfilled?: OnFulfilled<T>, onRejected?: OnRejected<T>) {
    let nextPromiseResolve: ResolveFn<any>
    let nextPromiseReject: RejectFn<any>
    const nextPromise = new MyPromise((resolve, reject) => {
      nextPromiseResolve = resolve
      nextPromiseReject = reject
    })

    this.thenInfoList.push({
      promise: nextPromise,
      onFulfilled,
      onRejected,
    })

    if (this.state !== 'pending') {
      this.run(this.thenInfoList.length - 1)
    }

    return nextPromise
  }
  

  public static resolve(value: any) {
    return value instanceof MyPromise ? value : new MyPromise((resolve, reject) => {
      resolve(value)
    })
  }

  private static resolvePromise<T>(promise: MyPromise<T>, x: any, resolve: ResolveFn<T>, reject: RejectFn<T>) {
    if (promise === x) {
      throw new TypeError('promise is equal to x')
    }
    if (x instanceof MyPromise) {
      if (x.state === 'pending') {
        promise.state = 'pending'
        x.then(resolve, reject)
      } else if (x.state === 'fulfilled') {
        resolve(x.result)
      } else if (x.state === 'rejected') {
        reject(x.result)
      }
    } else if (typeof x === 'object' || isFunction(x)) {
      try {
        const then = x.then
        if (!isFunction(then)) return resolve(x)
        x.then((y: any) => {
          MyPromise.resolvePromise(promise, y, resolve, reject)
        }, (err: any) => {
          reject(err)
        })
      } catch (err) {
        reject(err)
      }
    } else {
      resolve(x)
    }
  }


}
