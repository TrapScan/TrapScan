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

function relativeBearing (p1, p2, heading) {
  // Converts from degrees to radians.
  function toRadians (degrees) {
    return degrees * Math.PI / 180
  };

  // Converts from radians to degrees.
  function toDegrees (radians) {
    return radians * 180 / Math.PI
  }

  let startLat = p1[0]
  let startLng = p1[1]

  let destLat = p2[0]
  let destLng = p2[1]

  startLat = toRadians(startLat)
  startLng = toRadians(startLng)
  destLat = toRadians(destLat)
  destLng = toRadians(destLng)

  const y = Math.sin(destLng - startLng) * Math.cos(destLat)
  const x = Math.cos(startLat) * Math.sin(destLat) -
        Math.sin(startLat) * Math.cos(destLat) * Math.cos(destLng - startLng)
  let brng = Math.atan2(y, x)
  brng = toDegrees(brng)
  brng = (brng + 360) % 360
  return Math.abs(heading - brng)
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
    scanError: null,
    pcordData: null,
    admin: false
  },
  mutations: {
    scanQR (state, data) {
      if (data.qr_id === null) {
        // Dealing with an unmapped trap here (from location screen)
        scan.checkPCordByTrap(data.id).then((response) => {

        })
          .catch(() => {
          // User not a coordinator for this trap, shouldn't happen, abort aggresivly
            state.scanError = 'You don\'t have permission to do that'
          })
      } else {
        // QR exists, trap may not
        scan.scan(data.qr_id).then((response) => {
          const trap = response.data
          state.scannedTrap = trap
          state.scannedQRID = data.qr_id
          let pcord = false
          scan.checkPCord().then((response) => {
            pcord = true
            state.pcordData = response.data
          }).catch(() => {
            pcord = false
          }).finally(() => {
            const currentUser = data.user
            let admin = false
            currentUser.roles.forEach(element => {
              if (element.name === 'admin') {
                admin = true
                state.admin = true
              }
            })

            if (trap) {
              // Check if unmapped (no nz id) and if admin / pcord => Installation form
              if (!trap.nz_trap_id && (pcord || admin)) {
                router.push('/installform')
              } else if (!trap.nz_trap_id) {
                // Trap is unmapped and this isn't a pcord or admin
                state.scanError = 'This QR code is unmapped, please contact the project coordinator or admin'
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
      }
    },
    nearby (state, location) {
      // location = { lat: -41.307832, long: 174.756868 } // Debug
      if (location.heading === null) location.heading = 151.20166015625
      scan.nearby(location.lat, location.long).then((data) => {
        for (let i = 0; i < data.data.length; i++) {
          const trap = data.data[i]
          const distance = haversine([location.lat, location.long], trap.coordinates.coordinates)
          const compassBearing = relativeBearing([location.lat, location.long], trap.coordinates.coordinates, location.heading)
          trap.distance = prettyDistance(distance)
          trap.compassBearing = compassBearing
          data.data[i] = trap
        }
        state.nearbyTraps = data.data
      })
    },
    updateNearby (state, trap) {
      // Locally update the data to give immediate feedback to the users
      for (let i = 0; i < state.nearbyTraps.length; i++) {
        const nearbyTrap = state.nearbyTraps[i]
        if (nearbyTrap.nz_trap_id === trap.nz_id && nearbyTrap.qr_id === null) {
          nearbyTrap.qr_id = trap.qr_id
          state.nearbyTraps.splice(i, 1, nearbyTrap)
          break
        }
      }
    }
  },
  actions: {
    scanQR ({ commit, rootState }, form) {
      form.user = rootState.auth.user
      commit('scanQR', form)
      rootState.auth.user.roles.forEach(element => {
        if (element.name === 'admin') {
          commit('fetchNoCodes', null, { root: true })
        }
      })
    },
    nearby ({ commit }, location) {
      commit('nearby', location)
    },
    updateNearby ({ commit }, trap) {
      commit('updateNearby', trap)
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
    },
    pcordOptions (state) {
      // Todo: Sort all the traps by distance
      return state.pcordData.project
    },
    scanAdmin (state) {
      return state.admin
    }
  }
}

export default scanModule
