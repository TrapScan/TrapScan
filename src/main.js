import Vue from 'vue'
import App from './App.vue'
import * as Sentry from '@sentry/vue'
import { BrowserTracing } from '@sentry/tracing'
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

Sentry.init({
  Vue,
  environment: process.env.NODE_ENV,
  dsn: 'https://50c55552f8494640b23b4d6310d09ee7@o386630.ingest.sentry.io/5221153',
  integrations: [
    new BrowserTracing({
      routingInstrumentation: Sentry.vueRouterInstrumentation(router),
      tracingOrigins: ['localhost:8080', 'trapscan.app', /^\//]
    })
  ],
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0
})

store.dispatch('me').then(() => {
  new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
  }).$mount('#app')
})
