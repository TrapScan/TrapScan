import api from './api'

export default {
  async globalKpis () {
    return api.get('/api/stats/kpi')
  }

  //   async logout () {
  //     await csrf.getCookie()
  //     return api.post('/logout')
  //   },
}
