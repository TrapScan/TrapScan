import admin from '../api/admin'

const adminModule = {
  state: {
    recentQRList: []
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
    mapQRCode (state, form) {
      return new Promise((resolve, reject) => {
        admin.createNewQR({ number: form.number }).then((response) => {
          state.recentQRList = response.data.new_qr_codes
          resolve(response)
        })
          .catch((error) => {
            console.error(error)
            reject(error.response.data.errors)
          })
      })
    }
  },
  actions: {
    submitQRCreationForm ({ commit }, form) {
      commit('submitQRCreationForm', form)
    }
  },
  getters: {
    recentQRs (state) {
      return state.recentQRList
    }
  }
}

export default adminModule
