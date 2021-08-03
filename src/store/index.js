import Vue from 'vue'
import Vuex from 'vuex'
import authModule from './auth'
import inspectionFormModule from './inspections'
import adminModule from './admin'
import scanModule from './scan'
import settingsModule from './settings'
import stats from '../api/stats'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth: authModule,
    inspectionForm: inspectionFormModule,
    admin: adminModule,
    scan: scanModule,
    settings: settingsModule
  },
  state: {
    // Generic display component for form messages from backend
    formMessage: {
      status: null, // Drives message component type ['error', 'success', 'warning']
      message: null,
      errorList: null // Optional object of errors return by laravel
    },
    // Stats, include any defaults needed, but whole object will be rewritten
    globalStats: {
      total_inspections: 0,
      total_catches: 0,
      total_traps: 0,
      total_projects: 0,
      total_users: 0,
      average_catches_per_user: 0.0,
      average_inspections_per_user: 0.0,
      average_trap_per_project: 0.0,
      average_project_per_user: 0.0
    },
    // Static components
    species: ['Rat', 'Mouse', 'Stoat', 'Weasel', 'Hedgehog'],
    extraSpecies: ['Rat - Kiore', 'Rat - Norway', 'Unspecified', 'Bird', 'Rat - Ship', 'Cat', 'Deer', 'Dog', 'Ferret', 'Goat', 'Hare', 'Magpie', 'Peafowl', 'Pig', 'Possum', 'Rabbit', 'Turkey'],
    bait: ['Peanut Butter', 'Goodnature Rat and Mouse Lure', 'Dehydrated Rabbit', 'Whole egg', 'Chocolate'],
    extraBait: ['Carrot ', 'Cereal', 'Cheese', 'Dried fruit ', 'Ferret Bedding', 'Fresh Fruit', 'Fresh Meat', 'Fresh Possum', 'Fresh Rabbit', 'Golf ball', '​Goodnature Stoat Lure', 'Lure', 'Lure-it Salmon Spray', 'Mayo', 'Mustelid and Cat Lure', 'Nut', 'Nutella', 'Possum Dough', 'Rat and Possum Lure', 'Rat oil', 'Salted meat', 'Salted Possum', 'Salted Rabbit', 'Smooth', 'Terracotta Lures', 'Tinned Sardines']
  },
  mutations: {
    setFormError (state, error) {
      state.formMessage.status = 'error'
      state.formMessage.message = error.message
      state.formMessage.errorList = error.errors
    },
    setFormSuccess (state, success) {
      state.formMessage.status = 'success'
      state.formMessage.message = success.message
      state.formMessage.errorList = null
    },
    clearFormStatus (state, success) {
      state.formMessage.status = null
      state.formMessage.message = null
      state.formMessage.errorList = null
    },
    setStats (state, stats) {
      state.globalStats = stats
    }
  },
  actions: {
    setError ({ commit }, { error }) {
      commit('setFormError', error)
    },
    setSuccess ({ commit }, { success }) {
      commit('setFormSuccess', success)
    },
    clearFormStatus ({ commit }) {
      commit('clearFormStatus')
    },
    async fetchStats ({ commit }) {
      const newStats = await stats.globalKpis()
      commit('setStats', newStats.data)
    }
  },
  getters: {
    formErrorStatus (state) {
      return state.formMessage.status
    },
    formErrorMessage (state) {
      return state.formMessage.message
    },
    formErrorList (state) {
      return state.formMessage.errorList
    },
    inspectionFormErrors (state) {
      return state.form_error
    },
    inspectionFormHasError (state) {
      return state.form_error.length !== 0
    },
    getSpecies (state) {
      return state.species
    },
    getExtraSpecies (state) {
      return state.extraSpecies
    },
    allSpecies (state) {
      return state.species.concat(state.extraSpecies).sort()
    },
    getBait (state) {
      return state.bait
    },
    getExtraBait (state) {
      return state.extraBait
    },
    getGlobalStats (state) {
      return state.globalStats
    }
  }
})
