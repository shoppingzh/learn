import { stopWindowRunning, createDOM } from './util'

function createBase(window: Window) {
  const doc = window.document
  const base = doc.createElement('base')

  doc.head.appendChild(base)

  return base
}

export async function createIframe() {
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
  createBase(iframe.contentWindow)

}
