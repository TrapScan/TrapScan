import Vue from 'vue'
import VueRouter from 'vue-router'
import MagicLoginCallback from '../views/Passwordless/MagicLoginCallback.vue'
const Home = () => import('../views/Home.vue')
const Dashboard = () => import('../views/Dashboard.vue')
const Scan = () => import('../views/Scan.vue')
const Form = () => import('../views/Form/Form.vue')
const Admin = () => import('../views/Admin.vue')
const QRInstall = () => import('../views/Admin/QRInstall.vue')
const About = () => import('../views/About.vue')
const Settings = () => import('../views/Settings.vue')
const ResetPassword = () => import('../views/ResetPassword.vue')
const ForgotPassword = () => import('../views/ForgotPassword.vue')
const Register = () => import('../views/Register.vue')
const AnonInspectionForm = () => import('../views/AnonForm/AnonInspectionForm')

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
