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
  }
}
