import axios from 'axios'
import { isRoot } from './config'

const instance = axios.create({
  baseURL: `http://localhost:${isRoot ? '3000' : '3001'}`,
})

instance.interceptors.response.use(
  response => {
    const data = response.data
    alert(data)
    return data
  },
  error => {
    alert(error)
  }
)

export default instance
