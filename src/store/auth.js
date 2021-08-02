import axios from 'axios'
import firebase from 'firebase'

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
    async signIn ({ dispatch }, credentials) {
      await axios.get('/sanctum/csrf-cookie')
      await axios.post('/login', credentials)

      return dispatch('me')
    },
    async signOut ({ dispatch }) {
      await axios.post('/logout')
      location.reload()

      return dispatch('me')
    },
    me ({ commit }) {
      return axios.get('/api/user').then((response) => {
        commit('SET_AUTHENTICATED', true)
        commit('SET_USER', response.data.data)
      }).catch(() => {
        commit('SET_AUTHENTICATED', false)
        commit('SET_USER', null)
      })
    },
    async loginWithGooglePopUp ({ commit }) {
      // var provider = new firebase.auth.GoogleAuthProvider()
      // firebase.auth()
      //   .signInWithPopup(provider)
      //   .catch((error) => {
      //     alert(error)
      //     commit('setError', error)
      //   })
      await axios.get('/sanctum/csrf-cookie')
      await axios.get('/api/login/google')

      return this.dispatch('me')
    },
    loginWithGoogleRedirect ({ commit }) {
      var provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth()
        .signInWithRedirect(provider)
        .catch((error) => {
          alert(error)
          commit('setError', error)
        })
    },
    loginWithFacebookPopUp ({ commit }) {
      var provider = new firebase.auth.FacebookAuthProvider()
      firebase
        .auth()
        .signInWithPopup(provider)
        .catch((error) => {
          alert(error)
          commit('setError', error)
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
