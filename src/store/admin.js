// import { reject } from 'core-js/fn/promise'
import admin from '../api/admin'

const adminModule = {
  state: {
    recentQRList: [],
    mapFormError: false,
    mapFormErrorMessage: null
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
    }
  },
  actions: {
    submitQRCreationForm ({ commit }, form) {
      commit('submitQRCreationForm', form)
    },
    submitQRMapForm ({ commit }, form) {
      return admin.mapCode(form)
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
    }
  }
}

export default adminModule
