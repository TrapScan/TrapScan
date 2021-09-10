import router from '../router/index'
import scan from '../api/scan'

const scanModule = {
  state: {
    scannedQRID: null,
    scannedTrap: null,
    nearbyTraps: [],
    scanError: null
  },
  mutations: {
    scanQR (state, data) {
      scan.scan(data.qr_id).then((response) => {
        const trap = response.data
        state.scannedTrap = trap
        state.scannedQRID = data.qr_id
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
            if (!trap.nz_trap_id && (pcord || admin)) {
              router.push('/installform')
            } else {
              // Go to inspection form
              router.push('/form')
            }
          } else {
            state.scanError = 'Trap was not found with id: ' + data.qr_id
          }
        })
      }).catch((error) => {
        if (error.response) {
          state.scanError = error.response.data.message
        } else {
          state.scanError = error.message
        }
      })
    },
    nearby (state, location) {
      scan.nearby(location.lat, location.long).then((data) => {
        state.nearbyTraps = data.data
      })
    }
  },
  actions: {
    scanQR ({ commit, rootState }, form) {
      form.user = rootState.auth.user
      commit('scanQR', form)
    },
    nearby ({ commit }, location) {
      commit('nearby', location)
    }
  },
  getters: {
    scannedCodeValue (state) {
      return state.scannedQRID
    },
    nearbyTraps (state) {
      return state.nearbyTraps
    },
    scanError (state) {
      return state.scanError
    }
  }
}

export default scanModule
