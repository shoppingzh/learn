

<template>
  <WujieVue
    url="http://100.119.120.55:5174"
    :beforeLoad="beforeLoad" />
</template>

<script setup lang="ts">
import WujieVue from 'wujie-vue3'

function beforeLoad(appWindow: any) { 
  appWindow.CSSStyleSheet = appWindow.top.CSSStyleSheet
}
</script>

<style scoped>

</style>
