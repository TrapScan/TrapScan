import Vue from 'vue'
import Vuex from 'vuex'
import authModule from './auth'
import inspectionFormModule from './inspections'
import adminModule from './admin'
import scanModule from './scan'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth: authModule,
    inspectionForm: inspectionFormModule,
    admin: adminModule,
    scan: scanModule
  },
  state: {
    formMessage: {
      status: null, // Drives message component type ['error', 'success', 'warning']
      message: null,
      errorList: null // Optional object of errors return by laravel
    },
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
    getBait (state) {
      return state.bait
    },
    getExtraBait (state) {
      return state.extraBait
    }
  }
})
