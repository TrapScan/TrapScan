import api from './api'
import csrf from './csrf'

export default {
  async create (data) {
    await csrf.getCookie()
    return api.post('/api/inspection/create', data)
  },
  async createAnon (data) {
    await csrf.getCookie()
    const post = {
      QR_ID: data.QR_ID,
      species_caught: data.species_caught
    }
    return api.post('/api/inspection/anon/create', post)
  }
}
