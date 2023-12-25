import { App } from './common'
import './main'
export * from './app'


declare global {
  interface Window {
    __APP: App
  }
}
