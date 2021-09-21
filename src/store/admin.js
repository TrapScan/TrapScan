// import { reject } from 'core-js/fn/promise'
import admin from '../api/admin'

const adminModule = {
  state: {
    recentQRList: [],
    mapFormError: false,
    mapFormErrorMessage: null,
    noCodes: [],
    unmappedCodes: [],
    allTraps: []
  },
  mutations: {
    submitQRCreationForm (state, form) {
      return new Promise((resolve, reject) => {
        if (form.project === null) {
          admin.createNewQR({ number: form.number }).then((response) => {
            state.recentQRList = response.data.new_qr_codes
            resolve(response)
          })
            .catch((error) => {
              console.error(error)
              reject(error.response.data.errors)
            })
        } else {
          admin.createNewQRForProject(form.project, { number: form.number }).then((response) => {
            state.recentQRList = response.data.new_qr_codes
            resolve(response)
          })
            .catch((error) => {
              console.error(error)
              reject(error.response.data.errors)
            })
        }
      })
    },
    async fetchNoCodes (state) {
      admin.fetchUnmappedTraps()
        .then((res) => {
          state.noCodes = res.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    fetchUnmappedCodes (state) {
      admin.fetchUnmappedCodes()
        .then((res) => {
          state.unmappedCodes = res.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    fetchTraps (state) {
      admin.fetchTraps()
        .then((res) => {
          state.allTraps = res.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    removeNoCode (state, index) {
      state.noCodes.splice(index, 1)
    },
    removeUnmappedCode (state, index) {
      state.unmappedCodes.splice(index, 1)
    }
  },
  actions: {
    submitQRCreationForm ({ commit }, form) {
      commit('submitQRCreationForm', form)
    },
    submitQRMapForm ({ commit }, form) {
      return admin.mapCode(form)
    },
    fetchNoCodes ({ commit }) {
      commit('fetchNoCodes')
    },
    fetchUnmappedCodes ({ commit }) {
      commit('fetchUnmappedCodes')
    },
    fetchTraps ({ commit }) {
      commit('fetchTraps')
    },
    removeNoCode ({ commit }, index) {
      commit('removeNoCode', index)
    },
    removeUnmappedCode ({ commit }, index) {
      commit('removeUnmappedCode', index)
    }
  },
  getters: {
    recentQRs (state) {
      return state.recentQRList
    },
    mapFormErrors (state) {
      if (state.mapFormError) {
        return state.mapFormErrorMessage
      }
      return false
    },
    noCodes (state) {
      return state.noCodes
    },
    unmappedCodes (state) {
      return state.unmappedCodes
    },
    allTraps (state) {
      return state.allTraps
    }
  }
}

export default adminModule
