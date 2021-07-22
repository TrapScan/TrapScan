import router from '../router/index'
import scan from '../api/scan'

const scanModule = {
  state: {
    scannedQRID: null
  },
  mutations: {
    scanQR (state, data) {
      return new Promise((resolve, reject) => {
        scan.scan(data.qr_id).then((response) => {
          const trap = response.data[0]
          state.scannedQRID = data.qr_id
          console.log(state)
          let pcord = false
          scan.checkPCord(trap.project_id).then((response) => {
            pcord = true
          }).catch(() => {
            pcord = false
          }).finally(() => {
            const currentUser = data.user
            let admin = false
            currentUser.roles.forEach(element => {
              if (element.name === 'admin') admin = true
            })

            if (trap) {
              // Check if unmapped (no nz id) and if admin / pcord => Installation form
              if (!trap.nz_id && (pcord || admin)) {
                resolve(true)
                router.push('/installform')
              } else {
                // Go to inspection form
                resolve(false)
                router.push('/form')
              }
            } else {
              reject(new Error('Trap was not found with id: ' + data.qr_id))
            }
          })
        }).catch((error) => {
          reject(error.response.data.errors)
        })
      })
    }
  },
  actions: {
    scanQR ({ commit, rootState }, form) {
      form.user = rootState.auth.user
      commit('scanQR', form)
    },
    scanAnonQR ({ commit, rootState }, form) {
      form.user = rootState.auth.user
      commit('scanAnonQR', form)
    }
  },
  getters: {
    scannedCodeValue (state) {
      return state.scannedQRID
    }
  }
}

export default scanModule
