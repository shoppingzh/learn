import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:3000',
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
