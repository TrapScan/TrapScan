import Vuetify from '../plugins/vuetify'
import settings from '../api/settings'

const settingsModule = {
  state: {
    themes: {
      default: {
        name: 'Default',
        icon: '',
        light: {
          border: '#182532',
          google: '#ffffff',
          facebook: '#3b5998',
          apple: '#131216',
          banner: '#f5f5f5',
          primary: '#1976D2',
          secondary: '#424242',
          accent: '#82B1FF',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FFC107',
          card: '#FAFAFA', // Used in inspection form card background
          background: '#FAF9F6', // // Basic background of the app
          icon_background: '#DADADA', // Used in inspection form icon background
          green: '#0AB587',
          primary_text: '#0ED9A3',
          card_primary: '#163B5E',
          card_secondary: '#ABC2D2',
          blue: '#286EA2',
          greyblue: '#ABC2D2',
          purple: '#283696',
          yellow: '#F2B148',
          red: '#B13732'
        },
        dark: {
          border: '#ABC2D2',
          google: '#ffffff',
          facebook: '#3b5998',
          apple: '#131216',
          banner: '#272727',
          primary: '#1976D2',
          secondary: '#424242',
          accent: '#82B1FF',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FFC107',
          card: '#182532', // Used in inspection form card background
          background: '#0D151C', // Basic background of the app
          icon_background: '#101A23', // Used in inspection form icon background
          green: '#0AB587',
          primary_text: '#0ED9A3', // Light green
          card_primary: '#163B5E', // Dark blue
          card_secondary: '#ABC2D2', // Light grey
          blue: '#286EA2',
          greyblue: '#ABC2D2',
          purple: '#283696',
          yellow: '#F2B148',
          red: '#B13732'
        }
      },
      ngirungiru: {
        name: 'Ngirungiru',
        icon: '',
        light: {
          border: '#182532',
          google: '#ffffff',
          facebook: '#3b5998',
          apple: '#131216',
          banner: '#EBD333',
          primary: '#172635',
          secondary: '#424242',
          accent: '#82B1FF',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FFC107',
          card: '#FAFAFA', // Used in inspection form card background
          background: '#E5EEF9', // Basic background of the app
          icon_background: '#DADADA', // Used in inspection form icon background
          green: '#0AB587',
          primary_text: '#0ED9A3',
          card_primary: '#163B5E',
          card_secondary: '#ABC2D2',
          blue: '#286EA2',
          greyblue: '#ABC2D2',
          purple: '#283696',
          yellow: '#F2B148',
          red: '#B13732'
        },
        dark: {
          border: '#ABC2D2',
          google: '#ffffff',
          facebook: '#3b5998',
          apple: '#131216',
          banner: '#23374A',
          primary: '#EBD333',
          secondary: '#424242',
          accent: '#82B1FF',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FFC107',
          card: '#182532', // Used in inspection form card background
          background: '#0D151C', // Basic background of the app
          icon_background: '#101A23', // Used in inspection form icon background
          green: '#0AB587',
          primary_text: '#0ED9A3',
          card_primary: '#163B5E',
          card_secondary: '#ABC2D2',
          blue: '#286EA2',
          greyblue: '#ABC2D2',
          purple: '#283696',
          yellow: '#F2B148',
          red: '#B13732'
        }
      },
      kakariki: {
        name: 'Kākāriki',
        icon: '',
        light: {
          border: '#182532',
          google: '#ffffff',
          facebook: '#3b5998',
          apple: '#131216',
          banner: '#DBF6AF',
          primary: '#009E73',
          secondary: '#424242',
          accent: '#82B1FF',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FFC107',
          card: '#FAFAFA', // Used in inspection form card background
          background: '#E5EEF9', // // Basic background of the app
          icon_background: '#DADADA', // Used in inspection form icon background
          green: '#0AB587',
          primary_text: '#0ED9A3',
          card_primary: '#163B5E',
          card_secondary: '#ABC2D2',
          blue: '#286EA2',
          greyblue: '#ABC2D2',
          purple: '#283696',
          yellow: '#F2B148',
          red: '#B13732'
        },
        dark: {
          border: '#ABC2D2',
          google: '#ffffff',
          facebook: '#3b5998',
          apple: '#131216',
          banner: '#115132',
          primary: '#009E73',
          secondary: '#424242',
          accent: '#82B1FF',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FFC107',
          card: '#182532', // Used in inspection form card background
          background: '#0D151C', // // Basic background of the app
          icon_background: '#101A23', // Used in inspection form icon background
          green: '#0AB587',
          primary_text: '#0ED9A3',
          card_primary: '#163B5E',
          card_secondary: '#ABC2D2',
          blue: '#286EA2',
          greyblue: '#ABC2D2',
          purple: '#283696',
          yellow: '#F2B148',
          red: '#B13732'
        }
      },
      kokako: {
        name: 'Kōkako',
        icon: '',
        light: {
          border: '#182532',
          google: '#ffffff',
          facebook: '#3b5998',
          apple: '#131216',
          banner: '#AAC2D1',
          primary: '#173B5F',
          secondary: '#424242',
          accent: '#82B1FF',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FFC107',
          card: '#FAFAFA', // Used in inspection form card background
          background: '#F4f4F4', // // Basic background of the app
          icon_background: '#DADADA', // Used in inspection form icon background
          green: '#0AB587',
          primary_text: '#0ED9A3',
          card_primary: '#163B5E',
          card_secondary: '#ABC2D2',
          blue: '#286EA2',
          greyblue: '#ABC2D2',
          purple: '#283696',
          yellow: '#F2B148',
          red: '#B13732'
        },
        dark: {
          border: '#ABC2D2',
          google: '#ffffff',
          facebook: '#3b5998',
          apple: '#131216',
          banner: '#293B47',
          primary: '#286EA2',
          secondary: '#424242',
          accent: '#82B1FF',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FFC107',
          card: '#182532', // Used in inspection form card background
          background: '#0D151C', // // Basic background of the app
          icon_background: '#101A23', // Used in inspection form icon background
          green: '#0AB587',
          primary_text: '#0ED9A3',
          card_primary: '#163B5E',
          card_secondary: '#ABC2D2',
          blue: '#286EA2',
          greyblue: '#ABC2D2',
          purple: '#283696',
          yellow: '#F2B148',
          red: '#B13732'
        }
      },
      rata: {
        name: 'Rātā',
        icon: '',
        light: {
          border: '#182532',
          google: '#ffffff',
          facebook: '#3b5998',
          apple: '#131216',
          banner: '#FFE0C4',
          primary: '#C24030',
          secondary: '#424242',
          accent: '#82B1FF',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FFC107',
          card: '#FAFAFA', // Used in inspection form card background
          background: '#F4f4F4', // // Basic background of the app
          icon_background: '#DADADA', // Used in inspection form icon background
          green: '#0AB587',
          primary_text: '#0ED9A3',
          card_primary: '#163B5E',
          card_secondary: '#ABC2D2',
          blue: '#286EA2',
          greyblue: '#ABC2D2',
          purple: '#283696',
          yellow: '#F2B148',
          red: '#B13732'
        },
        dark: {
          border: '#ABC2D2',
          google: '#ffffff',
          facebook: '#3b5998',
          apple: '#131216',
          banner: '#592119',
          primary: '#C24030',
          secondary: '#424242',
          accent: '#82B1FF',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FFC107',
          card: '#182532', // Used in inspection form card background
          background: '#0D151C', // // Basic background of the app
          icon_background: '#101A23', // Used in inspection form icon background
          green: '#0AB587',
          primary_text: '#0ED9A3',
          card_primary: '#163B5E',
          card_secondary: '#ABC2D2',
          blue: '#286EA2',
          greyblue: '#ABC2D2',
          purple: '#283696',
          yellow: '#F2B148',
          red: '#B13732'
        }
      },
      kotukutuku: {
        name: 'Kōtukutuku',
        icon: '',
        light: {
          border: '#182532',
          google: '#ffffff',
          facebook: '#3b5998',
          apple: '#131216',
          banner: '#DEC6F5',
          primary: '#382997',
          secondary: '#424242',
          accent: '#82B1FF',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FFC107',
          card: '#FAFAFA', // Used in inspection form card background
          background: '#F4f4F4', // // Basic background of the app
          icon_background: '#DADADA', // Used in inspection form icon background
          green: '#0AB587',
          primary_text: '#0ED9A3',
          card_primary: '#163B5E',
          card_secondary: '#ABC2D2',
          blue: '#286EA2',
          greyblue: '#ABC2D2',
          purple: '#283696',
          yellow: '#F2B148',
          red: '#B13732'
        },
        dark: {
          border: '#ABC2D2',
          google: '#ffffff',
          facebook: '#3b5998',
          apple: '#131216',
          banner: '#2A1C50',
          primary: '#DEC6F5',
          secondary: '#424242',
          accent: '#82B1FF',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FFC107',
          card: '#1F1E34', // Used in inspection form card background
          background: '#0D151C', // // Basic background of the app
          icon_background: '#101A23', // Used in inspection form icon background
          green: '#0AB587',
          primary_text: '#0ED9A3',
          card_primary: '#163B5E',
          card_secondary: '#ABC2D2',
          blue: '#286EA2',
          greyblue: '#ABC2D2',
          purple: '#283696',
          yellow: '#F2B148',
          red: '#B13732'
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
    },
    submitFeedback (state, data) {
      settings.submitFeedback(data)
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
    setDefaultTheme ({ commit }) {
      commit('setTheme', 'default')
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
    },
    submitFeedback ({ commit }, data) {
      commit('submitFeedback', data)
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
    },
    isCoordinator (state) {
      return state.coordinatorSettings.length > 0
    }
  }
}

export default settingsModule
