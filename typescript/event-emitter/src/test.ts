import EventEmitter from './index'

const emitter: EventEmitter = new EventEmitter()
emitter.on('hello', (data) => {
  console.log(data)
})

emitter.on('hello', data => {
  console.log(`收到数据：${data}`)
})

setTimeout(() => {
  emitter.emit('hello', 1)
}, 1000)
