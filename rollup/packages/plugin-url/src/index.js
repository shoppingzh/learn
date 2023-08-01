import src from './rollup-logo.svg'

document.addEventListener('DOMContentLoaded', () => {
  const img = new Image()
  img.src = src
  img.width = 500
  document.body.appendChild(img)
})
