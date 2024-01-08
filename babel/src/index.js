const hello = () => {
  console.log(hello);
}

const obj = { a: 1, b: 2 }
const { a, b } = obj

console.log(a)
console.log(b)

hello()

new Promise((resolve) => {
  resolve(0)
}).then(console.log)

class Person {}

'123'.includes('2')