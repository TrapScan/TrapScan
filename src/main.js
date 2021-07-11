import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import firebase from 'firebase'
import vuetify from './plugins/vuetify'
import VueQrcodeReader from 'vue-qrcode-reader'
import axios from 'axios'

Vue.use(VueQrcodeReader)

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  const currentUser = store.getters.user
  const requireAuth = to.matched.some(record => record.meta.authRequired)
  if (requireAuth && !currentUser) next('/')
  else if (!requireAuth && currentUser) {
    next('/dashboard')
  } else {
    next()
  }
})

axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost'

var firebaseConfig = {
  apiKey: 'AIzaSyDLnhlwQ2lA2246I6alj2GM1kbrYIIB_mo',
  authDomain: 'trapscan-app.firebaseapp.com',
  projectId: 'trapscan-app',
  storageBucket: 'trapscan-app.appspot.com',
  messagingSenderId: '967559821858',
  appId: '1:967559821858:web:461e4d27f4a1f80e62a87b',
  measurementId: 'G-TW81PQ39B9'
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

store.dispatch('me').then(() => {
  new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
  }).$mount('#app')
})
