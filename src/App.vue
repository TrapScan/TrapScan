<template>
  <v-app :style="{background: $vuetify.theme.themes[theme].background, height: '100%'}">
    <!-- <inspection-nav-bar ></inspection-nav-bar> -->
    <navbar v-if="showNavBar"></navbar>
    <v-main>
      <v-container fluid style="height: 100%">
        <router-view></router-view>
      </v-container>
    </v-main>
    <v-footer v-if="isUserAuth && showNavBar" height="70%" color="white" :elevation="0" padless app>
        <bottom-nav id="main-bottom-nav" elevation="0"></bottom-nav>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import Navbar from './components/Navbar'
// import InspectionNavBar from './components/InspectionNavbar.vue'
import BottomNav from './components/BottomNav'
// import firebase from 'firebase'
export default {
  name: 'App',
  components: {
    Navbar,
    BottomNav
    // InspectionNavBar
  },
  data: () => ({
    //
  }),
  mounted () {
    this.$store.dispatch('fetchStats')
  },
  computed: {
    ...mapGetters(['getUser', 'isUserAuth', 'showNavBar']),
    theme () {
      return (this.$vuetify.theme.dark) ? 'dark' : 'light'
    }
  }
}
</script>
<style scoped>
#main-bottom-nav {
  height:100% !important;
}
</style>
