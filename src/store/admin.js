// import { reject } from 'core-js/fn/promise'
import admin from '../api/admin'

const adminModule = {
  state: {
    recentQRList: [],
    mapFormError: false,
    mapFormErrorMessage: null,
    noCodes: [],
    unmappedCodes: [],
    allTraps: [],
    allUsers: [],
    allProjects: [],
    userEditError: false,
    userEditErrorMessage: null
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
    },
    removeUnmappedCodeByCode (state, code) {
      for (let i = 0; i < state.unmappedCodes.length; i++) {
        const exisitngCode = state.unmappedCodes[i]
        if (exisitngCode.qr_code === code) {
          state.unmappedCodes.splice(i, 1)
          break
        }
      }
    },
    fetchUserProjects (state) {
      admin.fetchUserProjects()
        .then((res) => {
          state.allUsers = res.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    fetchProjects (state) {
      admin.fetchProjects()
        .then((res) => {
          state.allProjects = res.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    addProjectToUser (state, { userId, projectId }) {
      admin.addProjectToUser(userId, projectId)
    },
    removeUserFromProject (state, { userId, projectId }) {
      admin.removeUserFromProject(userId, projectId)
    },
    updateUserProject (state, { userId, projectId, value, key }) {
      state.userEditError = false
      state.userEditErrorMessage = null
      admin.updateUserProject(userId, projectId, value, key)
        .catch(err => {
          state.userEditError = true
          state.userEditErrorMessage = err
        })
    },
    setUserEditError (state, value) {
      state.userEditError = value
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
    },
    removeUnmappedCodeByCode ({ commit }, code) {
      commit('removeUnmappedCodeByCode', code)
    },
    submitCSV ({ commit }, file) {
      return admin.submitCSV(file)
    },
    scrapeData ({ commit }) {
      return admin.scrapeData()
    },
    adminFetchProjects ({ commit }) {
      commit('fetchProjects')
    },
    adminFetchUserProjects ({ commit }) {
      commit('fetchUserProjects')
    },
    addProjectToUser ({ commit }, data) {
      commit('addProjectToUser', data)
    },
    removeUserFromProject ({ commit }, data) {
      commit('removeUserFromProject', data)
    },
    updateUserProject ({ commit }, data) {
      commit('updateUserProject', data)
    },
    setUserEditError ({ commit }, value) {
      commit('setUserEditError', value)
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
    },
    allUsers (state) {
      return state.allUsers
    },
    allProjects (state) {
      return state.allProjects
    },
    userEditError (state) {
      return state.userEditError
    }
  }
}

export default adminModule
