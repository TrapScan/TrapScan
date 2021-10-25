import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import SuccessFailBanner from './components/SuccessFailBanner'

Vue.config.productionTip = false
Vue.component('message-banner', SuccessFailBanner)

router.beforeEach((to, from, next) => {
  const currentUser = store.getters.user
  const requireAuth = to.matched.some(record => record.meta.authRequired)
  const adminOnly = to.matched.some(record => record.meta.adminOnly)

  if (!currentUser) {
    // Apply the defualt theme
    store.dispatch('setDefaultTheme')
  }

  if (adminOnly && requireAuth && currentUser) {
    let admin = false
    currentUser.roles.forEach(element => {
      if (element.name === 'admin') admin = true
    })
    if (admin) next()
    else {
      next('/')
    }
  } else if (requireAuth && !currentUser) next('/')
  else if (!requireAuth && currentUser) {
    next('/dashboard')
  } else {
    next()
  }

  // Handle Scan redirect to anon form for non logged in users
  if (to.name === 'Scan') {
    if (!currentUser) {
      next('/anon/scan/' + to.params.code)
    }
  }
})

axios.defaults.withCredentials = true
axios.defaults.baseURL = process.env.VUE_APP_API_URL

store.dispatch('me').then(() => {
  new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
  }).$mount('#app')
})
