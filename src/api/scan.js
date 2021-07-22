import api from './api'

export default {
  async scan (qrId) {
    return api.get('/api/scan/' + qrId)
  },

  async scanAnon (qrId) {
    return api.get('/api/anon/scan/' + qrId)
  },

  async checkPCord (projectId) {
    return api.get('/api/user/isCoordinator/' + projectId)
  }
}
