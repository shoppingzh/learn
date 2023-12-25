import { AppContext } from './common'
import { stopWindowRunning, createDOM } from './util'

function createBase(app: AppContext, window: Window) {
  const doc = window.document
  const base = doc.createElement('base')
  base.href = app.appUrl.host + app.appUrl.path
  doc.head.appendChild(base)

  return base
}

interface CreateIframeOptions {
  url?: string
}

export async function createIframe(app: AppContext, options: CreateIframeOptions) {
  // 1. 创建不跨域iframe
  const iframe = document.createElement('iframe')
  iframe.src = location.href
  iframe.style.display = 'none'
  document.body.appendChild(iframe)

  // 2. 停止iframe运行，防止运行主应用
  await stopWindowRunning(iframe.contentWindow)

  // 3. 清空iframe DOM
  createDOM(iframe.contentWindow)

  // 4. 插入<base>，设置baseURI为子应用路径
  createBase(app, iframe.contentWindow)

  // 5. 代理
  Object.defineProperty(iframe.contentDocument, 'createElement', {
    get() {
      return function(tagName: string, options: any) {
        const el: HTMLElement = window.document.createElement.call(window.document, tagName, options)

        const { get, set } = Object.getOwnPropertyDescriptor(iframe.contentWindow.HTMLAnchorElement.prototype, 'href')

        Object.defineProperty(el, 'href', {
          set(v) {
            const url = new URL(v, app.appUrl.host + app.appUrl.path)
            
            return set.call(this, url.href)
          },
          get() {
            return get.call(this)
          }
        })
        return el
      }
    }
  })
  Object.defineProperty(iframe.contentDocument, 'body', {
    get() {
      return app.shadowRoot.querySelector('body')
    }
  })


  iframe.contentWindow.__APP = app

  return iframe
}
