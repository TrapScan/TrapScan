import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost'
})

api.defaults.withCredentials = true

export default api
