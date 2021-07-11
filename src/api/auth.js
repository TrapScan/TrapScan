// import axios from 'axios'
import api from './api'
import csrf from './csrf'

export default {
  async login (form) {
    await csrf.getCookie()
    return api.post('/login', form)
  },

  async logout () {
    await csrf.getCookie()
    return api.post('/logout')
  },

  auth () {
    return api.get('/user')
  }
}
