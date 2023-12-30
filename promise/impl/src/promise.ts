type ResolveFn<T> = (value: T) => void
type RejectFn<T> = (reason: any) => void
type Executor<T> = (resolve: ResolveFn<T>, reject: RejectFn<T>) => void
type OnFulfilled<T> = (value: T) => any // TODO 改进
type OnRejected<T> = (reason: any) => any // TODO 改进

type State = 'pending' | 'fulfilled' | 'rejected'

export default class MyPromise<T> {

  private state: State = 'pending'
  private result: any
  private onFulfilled: OnFulfilled<T>
  private onRejected: OnRejected<T>

  constructor(executor: Executor<T>) {
    if (!executor) throw new Error('executor为空')
    executor((value: T) => {
      this.resolve(value)
    }, (reason: any) => {
      this.reject(reason)
    })
  }

  private resolve(value: T) {
    if (this.state !== 'pending') return

    if (value instanceof MyPromise) {
      this.state = value.state
      value.then(val => {
        this.result = val
        this.run()
      }, err => {
        this.result = err
        this.run()
      })
    } else {
      if (typeof value === 'object' || typeof value === 'function') {
        try {
          const then = (value as any).then
          then((value: T) => {
            this.resolve(value)
          }, (reason: any) => {
            this.reject(reason)
          })
          return
        } catch (err) {
          this.reject(err)
        }
      } else {
        this.result = value
        this.state = 'fulfilled'
      }

      this.run()
    }


  }

  private reject(reason: any) {
    if (this.state !== 'pending') return
    this.result = reason
    this.state = 'rejected'
    this.run()
    // this.tryRun()
  }

  private run() {
    if (this.state === 'fulfilled') {
      return this.onFulfilled?.(this.result)
    } else if (this.state === 'rejected') {
      return this.onRejected?.(this.result)
    }
  }

  private tryRun() {

    if (this.state === 'pending') return

    if ((this.state === 'fulfilled' && !this.onFulfilled)
      || (this.state === 'rejected' && !this.onRejected)) return this

    return new MyPromise((resolve, reject) => {
      if (this.state === 'fulfilled') {
        queueMicrotask(() => {
          try {
            resolve(this.onFulfilled?.(this.result))
          } catch (err) {
            reject(err)
          }
        })
      } else if (this.state === 'rejected') {
        queueMicrotask(() => {
          try {
            reject(this.onRejected?.(this.result))
          } catch (err) {
            reject(err)
          }
        })
      }
    })
  }

  public then(onFulfilled?: OnFulfilled<T>, onRejected?: OnRejected<T>) {
    this.onFulfilled = typeof onFulfilled === 'function' ? (val: T) => onFulfilled(val) : null
    this.onRejected = typeof onRejected === 'function' ? (reason: any) => onRejected(reason) : null

    return MyPromise.resolve(this.run())
  }
  

  public static resolve(value: any) {
    return value instanceof MyPromise ? value : new MyPromise((resolve, reject) => {
      resolve(value)
      // if (typeof value === 'object' || typeof value === 'function') {
      //   try {
      //     const then = value.then
      //     if (typeof then !== 'function') return resolve(then)

      //     // value.then()
      //   } catch (err) {
      //     reject(err)
      //   }
      // } else {
      //   resolve(value)
      // }
    })
  }

}
