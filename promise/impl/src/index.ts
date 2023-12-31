import promisesAplusTests from 'promises-aplus-tests'
import MyPromise from './promise'

// 总共872个测试用例

const Promise = MyPromise

const test = () => {
  promisesAplusTests({
    resolved(value: any) {
      return new Promise((resolve) => resolve(value))
    },
    rejected(reason: any) {
      return new Promise((resolve, reject) => reject(reason))
    },
    deferred() {
      let resolve: any, reject: any
      const promise = new Promise((arg1, arg2) => {
        resolve = arg1
        reject = arg2
      })
      return {
        promise,
        resolve,
        reject,
      }
    }
  }, err => {
    console.error(err)
  })
}

console.log('start')

test()

// new Promise((resolve) => {
//   setTimeout(() => {
//     resolve('hello')
//   }, 50)
// })
//   .then(val => console.log(val))


// new Promise((resolve) => resolve(1))
//   .then()
//   .then()
//   .then(val => console.log(val))


// const p1 = new Promise((resolve, reject) => {
//   resolve(1)
//   setTimeout(() => {
//     resolve(1)
//   }, 1000);
// })
// p1.then(val => {
//   console.log(`第一次：${val}`)
//   return new Promise(resolve => setTimeout(() => resolve(2), 2000))
// }, err => {
//   console.error(err)
// }).then(val => {
//   console.log(val)
// }).then(val => {
//   console.log(val)
// })

// p1.then(val => {
//   console.log(`第二次：${val}`)
// })

// p1.then(val => {
//   console.log(`第三次：${val}`)
// })
