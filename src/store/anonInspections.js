import { DateTime } from 'luxon'

var date = DateTime.local().toFormat('yyyy-LL-dd HH:mm:ss')

const anonInspectionFormModule = {
  state: {
    form: {
      QR_ID: 'Test-1234',
      code: 'test',
      date: date,
      recorded_by: null,
      strikes: null,
      species_caught: null,
      status: null,
      rebaited: null,
      bait_type: null,
      trap_condition: null,
      notes: 'test',
      words: '',
      trap_last_checked: null
    },
    form_error: [],
    form_navigation_stack: [1],
    form_navigation_data_history: [
      {
        QR_ID: 'Test-1234',
        code: 'test',
        date: date,
        recorded_by: null,
        strikes: null,
        species_caught: null,
        status: null,
        rebaited: null,
        bait_type: null,
        trap_condition: null,
        notes: 'test',
        words: '',
        trap_last_checked: null
      }
    ],
    form_index: 1
  },
  mutations: {
    anonSetFormIndex (state, index) {
      state.form_index = index
      state.form_navigation_stack.push(index)
    },
    anonFormBackNavigate (state) {
      // Navigate back to last step
      state.form_navigation_stack.pop()
      // Reset the form data to the last step
      state.form_navigation_data_history.pop()
      state.form = {
        ...state.form_navigation_data_history[
          state.form_navigation_stack.length - 1
        ]
      }
    },
    anonUpdateForm (state, form) {
      const currentWords = state.form.words
      state.form = Object.assign(state.form, form)

      // Handle 'words' being concatenated, everything else can be assigned
      if (typeof form.words !== 'undefined') {
        state.form.words = currentWords + form.words
      }

      // Push the new form to the historical, this will be popped on backNavigate
      const formBackup = { ...state.form }
      state.form_navigation_data_history.push(formBackup)
    },
    anonSubmitInspectionForm (state) {
      console.log('Submitting stub')
    }
  },
  actions: {
    anonUpdateForm ({ commit }, { form }) {
      commit('anonUpdateForm', form)
    },
    anonFormBackNavigate ({ commit }) {
      commit('anonFormBackNavigate')
    },
    anonSetFormIndex ({ commit }, { index }) {
      commit('anonSetFormIndex', index)
    },
    anonSubmitInspectionForm ({ commit }) {
      commit('anonSubmitInspectionForm')
    }
  },
  getters: {
    anonGetFormIndex (state) {
      return state.form_index
    },
    anonGetCurrentFormIndex (state) {
      return state.form_navigation_stack[
        state.form_navigation_stack.length - 1
      ]
    },
    anonGetForm (state) {
      return state.form
    }
  }
}

export default anonInspectionFormModule
