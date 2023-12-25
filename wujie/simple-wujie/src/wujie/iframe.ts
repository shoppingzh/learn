import { Url } from './common'
import { stopWindowRunning, createDOM } from './util'

function createBase(window: Window) {
  const doc = window.document
  const base = doc.createElement('base')
  base.href = window.__APP.appUrl.host + window.__APP.appUrl.path

  doc.head.appendChild(base)

  return base
}

interface CreateIframeOptions {
  url?: string
  mainUrl?: Url
  appUrl?: Url
}

export async function createIframe(options: CreateIframeOptions) {
  // 1. 创建不跨域iframe
  const iframe = document.createElement('iframe')
  iframe.src = location.href
  iframe.style.display = 'none'
  document.body.appendChild(iframe)
  iframe.contentWindow.__APP = {
    mainUrl: options.mainUrl,
    appUrl: options.appUrl,
  }

  // 2. 停止iframe运行，防止运行主应用
  await stopWindowRunning(iframe.contentWindow)

  // 3. 清空iframe DOM
  createDOM(iframe.contentWindow)

  // 4. 插入<base>，设置baseURI为子应用路径
  createBase(iframe.contentWindow)


  return iframe
}
