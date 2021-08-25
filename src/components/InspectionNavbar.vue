<template>
  <v-app-bar app color="background" elevation="10">
    <v-toolbar-title>
      <v-icon large color="primary" class="justify-self-end"> mdi-chevron-left </v-icon>
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn icon v-if="isUserAuth" @click="signOut">
      <v-icon large color="primary" class="justify-self-end"> mdi-close </v-icon>
    </v-btn>
  </v-app-bar>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
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
