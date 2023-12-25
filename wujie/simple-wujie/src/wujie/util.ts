import { Url } from "./common";

/**
 * 停止窗口的运行
 * 
 * @param window 
 * @returns 
 */
export function stopWindowRunning(window?: Window) {
  return new Promise<void>((resolve, reject) => {
    if (!window) return reject();
    (function loop() {
      const doc = window.document
      setTimeout(() => {
        const newDoc = window.document
        if (!doc || doc === newDoc) return loop()
        window.stop()
        resolve()
      }, 1)
    })()
  })
}

/**
 * 在新窗口下创建一个新DOM
 * 
 * @param newWindow 
 */
export function createDOM(newWindow?: Window) {
  const doc = document.implementation.createHTMLDocument('')
  
  const newDocEl = newWindow.document.importNode(doc.documentElement, true)
  newWindow.document.replaceChild(newDocEl, newWindow.document.documentElement)
}

/**
 * 转换URL
 * 
 * @param url 
 * @returns 
 */
export function getUrl(url: URL) :Url {
  return {
    host: url.origin,
    path: url.pathname + url.search + url.hash,
  }
}