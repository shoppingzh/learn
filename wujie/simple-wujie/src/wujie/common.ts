export interface Url {
  host?: string
  path?: string
}

export interface AppContext {
  mainUrl?: Url
  appUrl?: Url
  container?: HTMLElement

  // js
  iframe?: HTMLIFrameElement

  // render
  component?: HTMLElement
  shadowRoot?: ShadowRoot

}
