import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
// import MagicLogin from '../views/MagicLogin.vue'
import Dashboard from '../views/Dashboard.vue'
import MagicLoginCallback from '../views/Passwordless/MagicLoginCallback.vue'
import Scan from '../views/Scan.vue'
import Form from '../views/Form/Form.vue'
import Admin from '../views/Admin.vue'
import QRInstall from '../views/Admin/QRInstall.vue'
import About from '../views/About.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    // component: () => import(/* webpackChunkName: "dashboard" */ '../views/Dashboard.vue'),
    meta: {
      authRequired: true
    }
  },
  {
    path: '/signIn/:email',
    name: 'SignIn',
    component: MagicLoginCallback
  },
  {
    path: '/scan',
    name: 'Scan',
    component: Scan,
    meta: {
      authRequired: true
    }
  },
  {
    path: '/form',
    name: 'Form',
    component: Form,
    meta: {
      authRequired: true
    }
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: {
      authRequired: true
    }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: {
      authRequired: true,
      adminOnly: true
    }
  },
  {
    path: '/installform',
    component: QRInstall,
    name: 'InstallationForm',
    meta: {
      authRequired: true,
      adminOnly: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
