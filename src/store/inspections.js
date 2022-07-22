import inspections from '../api/inspections'

const dateOb = new Date()

const day = ('0' + dateOb.getDate()).slice(-2)
const month = ('0' + (dateOb.getMonth() + 1)).slice(-2)
const year = dateOb.getFullYear()
const hours = ('0' + (dateOb.getHours())).slice(-2)
const minutes = ('0' + (dateOb.getMinutes())).slice(-2)
const seconds = ('0' + (dateOb.getSeconds())).slice(-2)

const dateS = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds
const timeS = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds

const getDefaultState = () => {
  return {
    form: {
      QR_ID: 'Test-1234',
      code: 'test',
      date: dateS,
      time: timeS,
      date_format: null,
      recorded_by: null,
      strikes: null,
      species_caught: null,
      status: null,
      rebaited: null,
      bait_type: null,
      trap_condition: null,
      notes: '',
      words: '',
      trap_last_checked: null,
      upload_to_nz: true
    },
    form_error: [],
    form_navigation_stack: [1],
    form_navigation_data_history: [
      {
        QR_ID: 'Test-1234',
        code: 'test',
        date: dateS,
        time: timeS,
        date_format: null,
        recorded_by: null,
        strikes: null,
        species_caught: null,
        status: null,
        rebaited: null,
        bait_type: null,
        trap_condition: null,
        notes: '',
        words: '',
        trap_last_checked: null,
        upload_to_nz: true
      }
    ],
    form_index: 1
  }
}

const inspectionFormModule = {
  state: getDefaultState(),
  mutations: {
    setFormIndex (state, index) {
      state.form_index = index
      state.form_navigation_stack.push(index)
    },
    formBackNavigate (state) {
      // Navigate back to last step
      state.form_navigation_stack.pop()
      // Reset the form data to the last step
      state.form_navigation_data_history.pop()
      state.form = { ...state.form_navigation_data_history[state.form_navigation_stack.length - 1] }
    },
    updateForm (state, form) {
      let currentWords = state.form.words
      const currentStatus = state.form.status
      state.form = Object.assign(state.form, form)
      // Handle 'words' being concatenated, everything else can be assigned
      if (typeof form.words !== 'undefined') {
        // Edge case defined here https://github.com/TrapScan/TrapScan/issues/74 (Previouse bait was still good section)
        if ((currentStatus === 'Still set, bait missing' || currentStatus === 'Still set, bait bad') &&
        form.words === 'and the bait was still good so I didn\'t rebait it.') {
          // Reset the form words to remove the non mistake
          currentWords = 'The trap caught nothing, '
        }
        state.form.words = currentWords + form.words
      }

      // Push the new form to the historical, this will be popped on backNavigate
      const formBackup = { ...state.form }
      state.form_navigation_data_history.push(formBackup)
    },
    submitInspectionForm (state, qrCode) {
      if (state.form.QR_ID === 'Test-1234') {
        state.form.QR_ID = qrCode
      }
      state.form.date_format = state.form.date + ' ' + state.form.time + ':00'
      return new Promise((resolve, reject) => {
        inspections.create(state.form).then((response) => {
          resolve(response)
        })
          .catch((error) => {
            reject(error.response.data.errors)
          })
      })
    },
    resetInspectionForm (state) {
      Object.assign(state, getDefaultState())
    }
  },
  actions: {
    updateForm ({ commit }, { form }) {
      commit('updateForm', form)
    },
    formBackNavigate ({ commit }) {
      commit('formBackNavigate')
    },
    setFormIndex ({ commit }, { index }) {
      commit('setFormIndex', index)
    },
    submitInspectionForm ({ commit, rootGetters }) {
      commit('submitInspectionForm', rootGetters.scannedCodeValue)
    },
    resetInspectionForm ({ commit }) {
      commit('resetInspectionForm')
    }
  },
  getters: {
    getFormIndex (state) {
      return state.form_index
    },
    getCurrentFormIndex (state) {
      return state.form_navigation_stack[state.form_navigation_stack.length - 1]
    },
    getForm (state) {
      return state.form
    }
  }
}

export default inspectionFormModule
