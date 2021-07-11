import Vue from 'vue'
import axios from 'axios'
import Vuex from 'vuex'
import firebase from 'firebase'
import inspections from '../api/inspections'
import { DateTime } from 'luxon'
// import auth from '../api/auth'
// import router from '../router/index'

Vue.use(Vuex)
var date = DateTime.local().toFormat('yyyy-mm-dd HH:mm:ss')
console.log(date)

export default new Vuex.Store({
  state: {
    authenticated: false,
    user: null,
    form: {
      QR_ID: 'Test-1234',
      code: 'test',
      date: date,
      recorded_by: null,
      strikes: null,
      species_caught: null,
      status: null,
      rebaited: null,
      bait_type: null,
      trap_condition: null,
      notes: 'test',
      words: '',
      trap_last_checked: null
    },
    form_error: [],
    form_navigation_stack: [1],
    form_navigation_data_history: [
      {
        QR_ID: null,
        code: null,
        date: null,
        recorded_by: null,
        strikes: null,
        species_caught: null,
        status: null,
        rebaited: null,
        bait_type: null,
        trap_condition: null,
        notes: null,
        words: '',
        trap_last_checked: null
      }
    ],
    form_index: 1,
    // user: null,
    error: null,
    email: null,
    species: ['Rat', 'Mouse', 'Stoat', 'Weasel', 'Hedgehog'],
    extraSpecies: ['Rat - Kiore', 'Rat - Norway', 'Unspecified', 'Bird', 'Rat - Ship', 'Cat', 'Deer', 'Dog', 'Ferret', 'Goat', 'Hare', 'Magpie', 'Peafowl', 'Pig', 'Possum', 'Rabbit', 'Turkey'],
    bait: ['Peanut Butter', 'Goodnature Rat and Mouse Lure', 'Dehydrated Rabbit', 'Whole egg', 'Chocolate'],
    extraBait: ['Carrot ', 'Cereal', 'Cheese', 'Dried fruit ', 'Ferret Bedding', 'Fresh Fruit', 'Fresh Meat', 'Fresh Possum', 'Fresh Rabbit', 'Golf ball', '​Goodnature Stoat Lure', 'Lure', 'Lure-it Salmon Spray', 'Mayo', 'Mustelid and Cat Lure', 'Nut', 'Nutella', 'Possum Dough', 'Rat and Possum Lure', 'Rat oil', 'Salted meat', 'Salted Possum', 'Salted Rabbit', 'Smooth', 'Terracotta Lures', 'Tinned Sardines']
  },
  mutations: {
    SET_AUTHENTICATED (state, value) {
      state.authenticated = value
    },
    SET_USER (state, value) {
      state.user = value
    },
    setUser (state, user) {
      state.user = user
    },
    setError (state, error) {
      state.error = error
    },
    setEmail (state, email) {
      state.email = email
    },
    setFormIndex (state, index) {
      state.form_index = index
      state.form_navigation_stack.push(index)
    },
    formBackNavigate (state) {
      // Navigate back to last step
      state.form_navigation_stack.pop()
      // Reset the form data to the last step
      state.form_navigation_data_history.pop()
      state.form = { ...state.form_navigation_data_history[state.form_navigation_stack.length - 1] }
    },
    updateForm (state, form) {
      const currentWords = state.form.words
      state.form = Object.assign(state.form, form)

      // Handle 'words' being concatenated, everything else can be assigned
      if (typeof form.words !== 'undefined') {
        state.form.words = currentWords + form.words
      }

      // Push the new form to the historical, this will be popped on backNavigate
      const formBackup = { ...state.form }
      state.form_navigation_data_history.push(formBackup)
    },
    submitInspectionForm (state) {
      return new Promise((resolve, reject) => {
        inspections.create(state.form).then((response) => {
          console.log(response)
          resolve(response)
        })
          .catch((error) => {
            console.log(error)
            reject(error.response.data.errors)
          })
      })
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
      // router.push('/')
      location.reload()

      return dispatch('me')
    },
    me ({ commit }) {
      return axios.get('/api/user').then((response) => {
        commit('SET_AUTHENTICATED', true)
        commit('SET_USER', response.data)
      }).catch(() => {
        commit('SET_AUTHENTICATED', false)
        commit('SET_USER', null)
      })
    },
    updateForm ({ commit }, { form }) {
      commit('updateForm', form)
    },
    formBackNavigate ({ commit }) {
      commit('formBackNavigate')
    },
    setFormIndex ({ commit }, { index }) {
      commit('setFormIndex', index)
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
    },
    startMagicSignIn ({ commit }, { email }) {
      commit('setEmail', email)
    },
    finishMagicSignIn ({ commit }, { user }) {
      commit('setUser', user)
    },
    setError ({ commit }, { error }) {
      commit('setError', error)
    },
    setUser ({ commit }, { user }) {
      commit('setUser', user)
    },
    submitInspectionForm ({ commit }) {
      commit('submitInspectionForm')
    }
  },
  modules: {
  },
  getters: {
    inspectionFormErrors (state) {
      return state.form_error
    },
    inspectionFormHasError (state) {
      return state.form_error.length !== 0
    },
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
    getError (state) {
      return state.error
    },
    signInEmail (state) {
      return state.email
    },
    getSpecies (state) {
      return state.species
    },
    getExtraSpecies (state) {
      return state.extraSpecies
    },
    getFormIndex (state) {
      return state.form_index
    },
    getCurrentFormIndex (state) {
      return state.form_navigation_stack[state.form_navigation_stack.length - 1]
    },
    getBait (state) {
      return state.bait
    },
    getExtraBait (state) {
      return state.extraBait
    },
    getForm (state) {
      return state.form
    },
    getUserEmail (state) {
      return state.user.user.email
    }
  }
})
