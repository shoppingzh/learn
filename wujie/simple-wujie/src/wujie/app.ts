import { createIframe } from "./iframe"
import { getUrl } from "./util"
import { createWujieAppComponent } from './shadowBox'

interface AppOptions {
  url: string
  container?: HTMLElement
}

export async function startApp(options: AppOptions) {
  const mainUrl = getUrl(new URL(window.location.href))
  const appUrl = getUrl(new URL(options.url))
  

  const iframe = await createIframe({
    url: options.url,
    mainUrl,
    appUrl,
  })

  const component = createWujieAppComponent()
  options.container.appendChild(component)

  
  // 启动应用
  const script = iframe.contentWindow.document.createElement('script')
  script.src = 'app.js'
  script.crossOrigin = ''
  iframe.contentWindow.document.body.appendChild(script)


}
