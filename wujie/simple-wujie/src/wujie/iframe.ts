
/**
 * 停止窗口的运行
 * 
 * @param window 
 * @returns 
 */
function stopWindowRunning(window?: Window) {
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

export function createIframe() {
  const iframe = document.createElement('iframe')
  iframe.src = location.href
  iframe.style.display = 'none'

  document.body.appendChild(iframe)

  stopWindowRunning(iframe.contentWindow)
}