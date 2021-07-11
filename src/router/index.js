import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
// import MagicLogin from '../views/MagicLogin.vue'
import Dashboard from '../views/Dashboard.vue'
import MagicLoginCallback from '../views/Passwordless/MagicLoginCallback.vue'
import Scan from '../views/Scan.vue'
import Form from '../views/Form/Form.vue'
import Admin from '../views/Admin.vue'

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
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
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
    path: '/admin',
    name: 'Admin',
    component: Admin,
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
