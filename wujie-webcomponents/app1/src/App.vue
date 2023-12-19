

<template>
  <my-link />

  <wired-button>我是一个按钮</wired-button>
</template>

<script setup lang="ts">
import style from './link.css?raw'
import 'wired-elements'

customElements.define('my-link',
  class extends HTMLElement {
    constructor() {
      super()

      const a = document.createElement('a')
      a.href = 'https://google.com'
      a.innerHTML = '链接'

      // const link = document.createElement('link')
      // link.rel = 'stylesheet'
      // link.href = style

      const sheet = new CSSStyleSheet()
      sheet.replaceSync(style)

      const shadowRoot = this.attachShadow({mode: 'open'})
      shadowRoot.adoptedStyleSheets = [sheet]
      // shadowRoot.appendChild(link)
      shadowRoot.appendChild(
        a
      )
    }
  }
)

</script>

<style scoped>
</style>
