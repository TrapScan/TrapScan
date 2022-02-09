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
  async fetchUnmappedTraps () {
    return api.get('/api/admin/nocode')
  },
  async mapCode (data) {
    await csrf.getCookie()
    return api.post('/api/admin/qr/map', data)
  },
  async print (code) {
    return api.get({
      url: '/api/admin/qr/print/' + code,
      responseType: 'blob'
    })
  },
  async fetchTraps () {
    return api.get('/api/admin/qr/all')
  },
  async submitCSV (csvData) {
    await csrf.getCookie()
    const formData = new FormData()
    formData.append('file', csvData)
    return api.post('/api/admin/scrape/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  async scrapeData () {
    return api.get('/api/admin/scrape')
  },
  async fetchProjects () {
    return api.get('/api/admin/projects')
  },
  async fetchUserProjects () {
    return api.get('/api/admin/users')
  },
  async addProjectToUser (userId, projectId) {
    await csrf.getCookie()
    return api.post('/api/admin/userProject', {
      userId,
      projectId
    })
  },
  async removeUserFromProject (userId, projectId) {
    await csrf.getCookie()
    return api.post('/api/admin/remove/userProject', {
      userId,
      projectId
    })
  },
  async updateUserProject (userId, projectId, value, key) {
    switch (key) {
      case 'coordinator':
        await csrf.getCookie()
        return api.put('/api/admin/userProject', {
          userId,
          projectId,
          value,
          key
        })
      default:
        return false
    }
  }
}
