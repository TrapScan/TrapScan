<template>
  <v-app>
    <navbar></navbar>
    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
    <v-footer v-if="isUserAuth" color="white" :elevation="0" padless app>
      <bottom-nav elevation="0"></bottom-nav>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import Navbar from './components/Navbar'
import BottomNav from './components/BottomNav'
// import firebase from 'firebase'
export default {
  name: 'App',
  components: {
    Navbar,
    BottomNav
  },
  data: () => ({
    //
  }),
  created () {
    // firebase.auth().onAuthStateChanged(user => {
    //   console.log('State Changed! User => ' + user)
    //   this.$store.dispatch('setUser', { user })
    //   if (user) {
    //     // User - go to dashboard
    //     this.$router.push('/dashboard').catch(() => {})
    //   } else {
    //     // No user, redirect to login
    //     this.$router.push('/').catch(() => {})
    //   }
    // })
  },
  computed: {
    ...mapGetters(['getUser', 'isUserAuth'])
  }
}
</script>
