import promisesAplusTests from 'promises-aplus-tests'
import MyPromise from './promise'

// 总共872个测试用例

const Promise = MyPromise

let resolve: any, reject: any
const promise = new Promise((arg1, arg2) => {
  resolve = arg1
  reject = arg2
})

const test = () => {
  promisesAplusTests({
    // resolved(value: any) {
    //   return new Promise((resolve) => setTimeout(() => {
    //     resolve(value)
    //   }))
    // },
    // rejected(reason: any) {
    //   return new Promise((resolve, reject) => setTimeout(() => {
    //     reject(reason)
    //   }))
    // },
    resolved(value: any) {
      return new Promise((resolve) => resolve(value))
    },
    rejected(reason: any) {
      return new Promise((resolve, reject) => reject(reason))
    },
    deferred() {
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


// new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(1)
//   }, 1000);
// }).then(val => {
//   console.log(val)
// }, err => {
//   console.error(err)
// })

