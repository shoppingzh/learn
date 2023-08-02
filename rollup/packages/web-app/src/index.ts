import logoImg from './assets/rollup-logo.svg'
import './styles/index.css'

const img = new Image()
img.src = logoImg
img.width = 300
document.body.appendChild(img)

alert(process.env.NODE_ENV)
