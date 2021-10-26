import api from './api'
import csrf from './csrf'

export default {
  async updateSettings (settings) {
    await csrf.getCookie()
    return api.post('/api/my/settings', { settings })
  },
  projectCoordinatorSettings () {
    return api.get('/api/my/coordinator/settings')
  },
  async updateCoordinatorSettings (settings) {
    await csrf.getCookie()
    return api.post('/api/my/coordinator/settings', settings)
  },
  async updateCatchFilter (catchFilter, projectId) {
    await csrf.getCookie()
    return api.post('/api/my/coordinator/catch/filter', {
      catch_filter: catchFilter,
      project_id: projectId
    })
  },
  async submitFeedback (data) {
    await csrf.getCookie()
    return api.post('/api/feedback', data)
  }
}
