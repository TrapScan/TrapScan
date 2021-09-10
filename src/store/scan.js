import router from '../router/index'
import scan from '../api/scan'

function haversine (p1, p2) {
  function toRad (x) {
    return x * Math.PI / 180
  }

  const lat1 = p1[0]
  const lon1 = p1[1]

  const lat2 = p2[0]
  const lon2 = p2[1]

  const R = 6371

  const x1 = lat2 - lat1
  const dLat = toRad(x1)
  var x2 = lon2 - lon1
  var dLon = toRad(x2)

  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  var d = R * c

  return d
}

function prettyDistance (d) {
  if (d > 1) {
    return d.toFixed(1) + ' km'
  } else {
    return Math.round(d * 100) + ' meters'
  }
}

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
      // location = { lat: -41.307832, long: 174.756868 } // Debug
      scan.nearby(location.lat, location.long).then((data) => {
        for (let i = 0; i < data.data.length; i++) {
          const trap = data.data[i]
          const distance = haversine([location.lat, location.long], trap.coordinates.coordinates)
          trap.distance = prettyDistance(distance)
          data.data[i] = trap
        }
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
