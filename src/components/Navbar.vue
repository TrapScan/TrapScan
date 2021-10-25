<template>
  <v-app-bar color="banner" app :elevation="elevation" hide-on-scroll>
    <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->

    <back-button v-if="this.$route.meta.showBackButton"></back-button>
    <v-toolbar-title v-else>Trap Scan</v-toolbar-title>

    <v-spacer></v-spacer>

    <!-- <v-btn icon>
      <v-icon>mdi-magnify</v-icon>
    </v-btn> -->

    <v-btn v-if="isUserAuth" icon value="settings" to="/settings">
      <v-icon>mdi-cog</v-icon>
    </v-btn>

    <v-btn icon v-if="isUserAuth" @click="signOut">
      <v-icon>mdi-logout</v-icon>
    </v-btn>
  </v-app-bar>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import BackButton from './BackButton.vue'
export default {
  components: { BackButton },
  props: {
    elevation: {
      type: Number,
      default: 5
    }
  },
  data () {
    return {
      navItems: [
        { name: 'Login', to: '/login', icon: 'lock' },
        { name: 'Register', to: '/register', icon: 'key' }
      ]
    }
  },
  methods: {
    ...mapActions(['signOut'])
  },
  computed: {
    ...mapGetters(['getUser', 'isUserAuth'])
  }
}
</script>
