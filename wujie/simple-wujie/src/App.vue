

<template>
  <div ref="el" class="container"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { startApp } from './wujie/index'

const el = ref()

onMounted(() => {
  startApp({
    url: 'http://127.0.0.1:5500/sub-app/index.html',
    container: el.value,
  })
})


</script>

<style>
* {
  box-sizing: border-box;
}
html, body, #app {
  height: 100%;
  margin: 0;
  padding: 0;
}
body {
  padding: 12px;
}
.container {
  width: 100%;
  height: 100%;
  border: 1px solid #ccc;
}
</style>
