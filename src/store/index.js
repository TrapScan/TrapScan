import Vue from 'vue'
import Vuex from 'vuex'
import authModule from './auth'
import inspectionFormModule from './inspections'
import adminModule from './admin'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth: authModule,
    inspectionForm: inspectionFormModule,
    admin: adminModule
  },
  state: {
    error: null,
    species: ['Rat', 'Mouse', 'Stoat', 'Weasel', 'Hedgehog'],
    extraSpecies: ['Rat - Kiore', 'Rat - Norway', 'Unspecified', 'Bird', 'Rat - Ship', 'Cat', 'Deer', 'Dog', 'Ferret', 'Goat', 'Hare', 'Magpie', 'Peafowl', 'Pig', 'Possum', 'Rabbit', 'Turkey'],
    bait: ['Peanut Butter', 'Goodnature Rat and Mouse Lure', 'Dehydrated Rabbit', 'Whole egg', 'Chocolate'],
    extraBait: ['Carrot ', 'Cereal', 'Cheese', 'Dried fruit ', 'Ferret Bedding', 'Fresh Fruit', 'Fresh Meat', 'Fresh Possum', 'Fresh Rabbit', 'Golf ball', '​Goodnature Stoat Lure', 'Lure', 'Lure-it Salmon Spray', 'Mayo', 'Mustelid and Cat Lure', 'Nut', 'Nutella', 'Possum Dough', 'Rat and Possum Lure', 'Rat oil', 'Salted meat', 'Salted Possum', 'Salted Rabbit', 'Smooth', 'Terracotta Lures', 'Tinned Sardines']
  },
  mutations: {
    setError (state, error) {
      state.error = error
    }
  },
  actions: {
    setError ({ commit }, { error }) {
      commit('setError', error)
    }
  },
  getters: {
    inspectionFormErrors (state) {
      return state.form_error
    },
    inspectionFormHasError (state) {
      return state.form_error.length !== 0
    },
    getError (state) {
      return state.error
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
