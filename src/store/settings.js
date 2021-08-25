import Vuetify from '../plugins/vuetify'
import settings from '../api/settings'

const settingsModule = {
  state: {
    themes: {
      default: {
        name: 'Default',
        icon: '',
        light: {
          primary: '#1976D2',
          secondary: '#424242',
          accent: '#82B1FF',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FFC107',
          card: '#FAFAFA', // Used in inspection form card background
          background: '#F4EFE1', // // Basic background of the app
          icon_background: '#DADADA' // Used in inspection form icon background
        },
        dark: {
          primary: '#1976D2',
          secondary: '#424242',
          accent: '#82B1FF',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FFC107',
          card: '#182532', // Used in inspection form card background
          background: '#0D151C', // Basic background of the app
          icon_background: '#0D151C' // Used in inspection form icon background
        }
      },
      miromiro: {
        name: 'Miromiro',
        icon: '',
        light: {
          primary: '#ebd333',
          secondary: '#e5eef9',
          accent: '#172635',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FFC107'
        },
        dark: {
          primary: '#ebd333',
          secondary: '#e5eef9',
          accent: '#172635',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FFC107'
        }
      },
      executePink: {
        name: 'Execute Pink',
        icon: '',
        light: {
          primary: '#ff34a2',
          secondary: '#ffe4f5',
          accent: '#0d004d',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FFC107'
        },
        dark: {
          primary: '#ff34a2',
          secondary: '#ffe4f5',
          accent: '#0d004d',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FFC107'
        }
      },
      ripeRed: {
        name: 'Ripe Red',
        icon: '',
        light: {
          primary: '#e91143',
          secondary: '#fff6ef',
          accent: '#111111',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FFC107'
        },
        dark: {
          primary: '#e91143',
          secondary: '#fff6ef',
          accent: '#111111',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FFC107'
        }
      },
      kokako: {
        name: 'Kokako',
        icon: '',
        light: {
          primary: '#173b5f',
          secondary: '#aac2d1',
          accent: '#293b47',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FFC107'
        },
        dark: {
          primary: '#173b5f',
          secondary: '#aac2d1',
          accent: '#293b47',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FFC107'
        }
      },
      indegoColourblind: {
        name: 'Indego Colourblind',
        icon: '',
        light: {
          primary: '#293697',
          secondary: '#fff6ef',
          accent: '#b85d7b',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FFC107'
        },
        dark: {
          primary: '#293697',
          secondary: '#fff6ef',
          accent: '#b85d7b',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FFC107'
        }
      }
    },
    settings: {
      theme: 'default', // Key in the themes object
      dark_mode: false
    },
    coordinatorSettings: [
      {
        notify_catches: null,
        catch_filter: null
      }
    ]
  },
  mutations: {
    setTheme (state, selectedTheme) {
      if (state.themes[selectedTheme]) {
        const theme = state.themes[selectedTheme]
        const dark = theme.dark
        const light = theme.light
        Object.keys(dark).forEach(i => {
          Vuetify.framework.theme.themes.dark[i] = dark[i]
        })
        Object.keys(light).forEach(i => {
          Vuetify.framework.theme.themes.light[i] = light[i]
        })
        state.settings.theme = selectedTheme
      }
    },
    setDarkMode (state, darkMode) {
      state.settings.dark_mode = darkMode
      Vuetify.framework.theme.dark = state.settings.dark_mode
    },
    setSettings (state, settings) {
      Object.assign(state.settings, settings)
    },
    updateSettingsRemote (state) {
      settings.updateSettings(state.settings)
    },
    setCoordinatorSettings (state, settings) {
      state.coordinatorSettings = settings
    },
    updateCatchFilter (state, catchFilter, projectId) {
      for (let i = 0; i < state.coordinatorSettings.length; i++) {
        const element = state.coordinatorSettings[i]
        if (element.id === projectId) {
          element.catchFilter = catchFilter
        }
      }
    }
  },
  actions: {
    setTheme ({ commit }, selectedTheme) {
      commit('setTheme', selectedTheme)
      commit('updateSettingsRemote') // Send the updated settings to the server
    },
    setDarkMode ({ commit }, darkMode) {
      commit('setDarkMode', darkMode)
      commit('updateSettingsRemote') // Send the updated settings to the server
    },
    setSettings ({ commit }, settings) {
      commit('setSettings', settings)
      commit('setTheme', settings.theme)
      commit('setDarkMode', settings.dark_mode)
    },
    async fetchCoordinatorSettings ({ commit }) {
      const data = await settings.projectCoordinatorSettings()
      let newSettings = data.data.data
      if (newSettings.length <= 0) newSettings = null
      commit('setCoordinatorSettings', newSettings)
    },
    updateCoordinatorSettings ({ commit }, revision) {
      settings.updateCoordinatorSettings(revision)
    },
    updateCatchFilter ({ commit }, { catchFilter, projectId }) {
      commit('updateCatchFilter', catchFilter, projectId)
      settings.updateCatchFilter(catchFilter, projectId)
    }
  },
  getters: {
    themeNames (state) {
      const names = []
      for (const [key, value] of Object.entries(state.themes)) {
        const themeName = { name: value.name, key: key }
        names.push(themeName)
      }
      return names
    },
    currentTheme (state) {
      return state.settings.theme
    },
    coordinatorSettings (state) {
      return state.coordinatorSettings
    }
  }
}

export default settingsModule
