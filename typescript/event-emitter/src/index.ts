
type EventType = string | symbol
type Handler = (...args: any[]) => void
type HandlerList = Handler[]
type Data = any

export interface EventEmitterInterface {
  on(type: EventType, handler: Handler): void
  emit(type: EventType, data: Data): void
}

export default class EventEmitter implements EventEmitterInterface {
  
  protected readonly handlersMap: Map<EventType, HandlerList> = new Map()

  on(type: EventType, handler: Handler): void {
    let handlers: HandlerList = this.handlersMap.get(type)
    if (!handlers) {
      this.handlersMap.set(type, (handlers = []))
    }
    handlers.push(handler)
  }

  emit(type: EventType, data: any): void {
    const handlers: HandlerList = this.handlersMap.get(type)
    if (!handlers) return
    for (const handler of handlers) {
      handler(data)
    }
  }

}
