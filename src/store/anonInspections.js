import inspections from '../api/inspections'

// var date = DateTime.local().toFormat('yyyy-LL-dd HH:mm:ss')

const dateOb = new Date()

const day = ('0' + dateOb.getDate()).slice(-2)
const month = ('0' + (dateOb.getMonth() + 1)).slice(-2)
const year = dateOb.getFullYear()
const hours = dateOb.getHours()
const minutes = ('0' + (dateOb.getMinutes())).slice(-2)
const seconds = dateOb.getSeconds()

const date = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds

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
    anonSubmitInspectionForm (state, code) {
      state.form.QR_ID = code
      inspections.createAnon(state.form)
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
    anonSubmitInspectionForm ({ commit }, { code }) {
      commit('anonSubmitInspectionForm', code)
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
