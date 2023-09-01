<template>
  <canvas ref="el" width="500" height="400" />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

const el = ref<HTMLCanvasElement>()
const text = 'shoppingzh 郑晓平'

onMounted(() => {
  const canvas = el.value!

  const ctx = canvas.getContext('2d')!
  ctx.save()

  ctx.fillStyle = '#000'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.restore()

  ctx.save()
  ctx.font = '50px 微软雅黑'
  ctx.fillStyle = '#fff'
  // ctx.textBaseline = ''

  const tm = ctx.measureText(text)
  const w = tm.actualBoundingBoxLeft + tm.actualBoundingBoxRight
  const h = tm.actualBoundingBoxAscent + tm.actualBoundingBoxDescent
  console.log(tm);

  const position = [30, 100]
  const realPosition = [position[0] + tm.actualBoundingBoxLeft, position[1] + tm.actualBoundingBoxAscent]
  
  ctx.fillText(text, realPosition[0], realPosition[1])
  ctx.restore()

  ctx.save()
  ctx.strokeStyle = 'red'
  ctx.lineWidth = 2
  ctx.strokeRect(position[0], position[1], w, h)
})


</script>
