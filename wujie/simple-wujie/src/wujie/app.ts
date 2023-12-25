import { createIframe } from "./iframe"
import { getUrl } from "./util"
import { createWujieAppComponent } from './shadowBox'
import { AppContext } from "./common"

interface AppOptions {
  url: string
  container?: HTMLElement
}

export async function startApp(options: AppOptions) {
  const app: AppContext = {}
  app.mainUrl = getUrl(new URL(window.location.href))
  app.appUrl = getUrl(new URL(options.url))

  const iframe = await createIframe(app, {
    url: options.url,
  })
  app.iframe = iframe

  const component = createWujieAppComponent(app)
  options.container.appendChild(component)

  
  // 启动应用
  const script = window.document.createElement('script')
  script.src = 'app.js'
  script.crossOrigin = ''
  iframe.contentWindow.document.head.appendChild(script)


}
