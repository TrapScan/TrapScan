<template>
  <v-app-bar app :elevation="elevation" collapse-on-scroll>
    <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->

    <v-toolbar-title>Trap Scan</v-toolbar-title>

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
export default {
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
