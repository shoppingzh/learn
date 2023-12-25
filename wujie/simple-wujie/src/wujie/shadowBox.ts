import { AppContext } from "./common"

export function createWujieAppComponent(app: AppContext) {
  const component = window.document.createElement('wujie-app')
  const shadow = component.attachShadow({
    mode: 'open'
  })

  const el = shadow.ownerDocument.createElement('html')

  el.innerHTML = `
    <html>
      <head></head>
      <body></body>
    </html>
  `
  shadow.appendChild(el)

  app.shadowRoot = shadow
  return component
}
