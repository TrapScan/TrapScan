import api from './api'
import csrf from './csrf'

export default {
  async updateSettings (settings) {
    await csrf.getCookie()
    return api.post('/api/my/settings', { settings })
  },
  projectCoordinatorSettings () {
    return api.get('/api/my/coordinator/settings')
  }
}
