// switch穿透
// const a: number = 1
// switch (a) {
//   case 1:
//     console.log(a)
//   case 2:
//     console.log(a)
// }

// 隐式any
// function hello(name) {
//   console.log(name)
// }

// 隐式this
// function hello2() {
//   console.log(this)
// }
function hello3(this: string) {
  console.log(this)
}
