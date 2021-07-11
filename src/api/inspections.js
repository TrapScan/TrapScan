import api from './api'
import csrf from './csrf'

export default {
  async create (data) {
    await csrf.getCookie()
    return api.post('/api/inspection/create', data)
  }
}
