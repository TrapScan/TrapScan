<template>
  <v-app>
    <navbar></navbar>
    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
    <v-footer v-if="isUserAuth" height="70%" color="white" :elevation="0" padless app>
        <bottom-nav id="main-bottom-nav" elevation="0"></bottom-nav>
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
  mounted () {
    this.$store.dispatch('fetchStats')
  },
  computed: {
    ...mapGetters(['getUser', 'isUserAuth'])
  }
}
</script>
<style scoped>
#main-bottom-nav {
  height:100% !important;
}
</style>
