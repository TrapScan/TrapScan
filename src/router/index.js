import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Dashboard from '../views/Dashboard.vue'
import MagicLoginCallback from '../views/Passwordless/MagicLoginCallback.vue'
import Scan from '../views/Scan.vue'
import Form from '../views/Form/Form.vue'
import Admin from '../views/Admin.vue'
import QRInstall from '../views/Admin/QRInstall.vue'
import About from '../views/About.vue'
import Settings from '../views/Settings.vue'
import ResetPassword from '../views/ResetPassword.vue'
import ForgotPassword from '../views/ForgotPassword.vue'
import Register from '../views/Register.vue'
import AnonInspectionForm from '../views/AnonForm/AnonInspectionForm'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/i/forgot/password',
    name: 'ForgotPassword',
    component: ForgotPassword,
    meta: {
      showBackButton: true
    }
  },
  {
    path: '/reset/password/:token',
    name: 'ResetPassowrd',
    component: ResetPassword
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      showBackButton: true
    }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
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
    path: '/settings',
    name: 'Settings',
    component: Settings,
    meta: {
      authRequired: true,
      showBackButton: true
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
    path: '/scan/:code',
    name: 'Scan',
    component: Scan,
    meta: {
      authRequired: true
    },
    props: route => ({ initial_code: route.params.code })
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
  },
  {
    path: '/installform',
    component: QRInstall,
    name: 'InstallationForm',
    meta: {
      authRequired: true
    }
  },
  {
    path: '/anon/scan/:code',
    component: AnonInspectionForm,
    name: 'ExternalScan'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
