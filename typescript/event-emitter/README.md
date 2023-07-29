```ts
import EventEmitter from 'event-emitter'

const emitter: EventEmitter = new EventEmitter()
emitter.on('hello', () => {

})

setTimeout(() => {
  emitter.emit('hello')
}, 1000)
```
