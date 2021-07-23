import api from './api'
import csrf from './csrf'

export default {
  async createNewQR (data) {
    await csrf.getCookie()
    return api.post('/api/admin/qr/create', data)
  },
  async createNewQRForProject (project, data) {
    await csrf.getCookie()
    return api.post('/api/admin/qr/create/' + project, data)
  },
  async fetchUnmappedCodes () {
    return api.get('/api/admin/qr/unmapped')
  },
  async fetchUnmappedCodesForProject (project) {
    return api.get('/api/admin/qr/unmapped/' + project)
  },
  async mapCode (data) {
    await csrf.getCookie()
    return api.post('/api/admin/qr/map', data)
  }
}
