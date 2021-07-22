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
    submitQRMapForm (state, form) {
      return new Promise((resolve, reject) => {
        admin.mapCode(form).then((response) => {
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
    },
    submitQRMapForm ({ commit }, form) {
      commit('submitQRMapForm', form)
    }
  },
  getters: {
    recentQRs (state) {
      return state.recentQRList
    }
  }
}

export default adminModule
