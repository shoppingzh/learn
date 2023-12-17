
<template>
  <p>
    <button @click="normal">发起一个普通跨域请求</button>
  </p>
  <p>
    <button @click="cookie">带Cookie的跨域请求</button>
  </p>

  <iframe v-if="isRoot" src="http://localhost:5174"></iframe>
</template>

<script setup lang="ts">
import service from './service'
import { isRoot } from './config'

function normal() {
  service.get('/hello')
}

function cookie() {
  service.get('/count', {
    withCredentials:  true,
  })
}
</script>

<style scoped>
iframe {
  width: 100%;
  border: 1px solid #aaa;
  outline: none;
}
</style>
