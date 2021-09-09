import axios from 'axios'
import auth from '../api/auth'

const authModule = {
  state: {
    authenticated: false,
    user: null,
    email: null
  },
  mutations: {
    SET_AUTHENTICATED (state, value) {
      state.authenticated = value
    },
    SET_USER (state, value) {
      state.user = value
    }
  },
  actions: {
    async register ({ dispatch }, form) {
      await axios.get('/sanctum/csrf-cookie')
      await axios.post('/register', form)

      return dispatch('me')
    },
    async signIn ({ dispatch }, credentials) {
      await axios.get('/sanctum/csrf-cookie')
      await axios.post('/login', credentials)

      return dispatch('me')
    },
    async resetPassword ({ dispatch }, form) {
      return auth.resetPassword(form)
    },
    async signOut ({ dispatch }) {
      await axios.post('/logout')
      location.reload()

      return dispatch('me')
    },
    me ({ commit, dispatch }) {
      return axios.get('/api/user').then((response) => {
        commit('SET_AUTHENTICATED', true)
        commit('SET_USER', response.data.data)
        dispatch('setSettings', response.data.data.settings)
        dispatch('fetchCoordinatorSettings')
      }).catch(() => {
        commit('SET_AUTHENTICATED', false)
        commit('SET_USER', null)
      })
    }
  },
  getters: {
    authenticated (state) {
      return state.authenticated
    },
    user (state) {
      return state.user
    },
    getUser (state) {
      return state.user
    },
    isUserAuth (state) {
      return !!state.user
    },
    signInEmail (state) {
      return state.email
    },
    getUserEmail (state) {
      return state.user.user.email
    }
  }
}

export default authModule
