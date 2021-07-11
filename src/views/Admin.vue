<template>
  <div>
    <v-app-bar
      dark
      scroll-target="#scrolling-techniques-3"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"
        ></v-img>
      </template>

      <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
      <v-btn icon>
        <v-icon>mdi-lock</v-icon>
      </v-btn>

      <v-app-bar-title>Admin</v-app-bar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <template v-slot:extension>
        <v-tabs v-model="tab" align-with-title>
          <v-tab href="#createQR">Create QR Codes</v-tab>
          <v-tab href="#unmappedCodes">Unmapped Codes</v-tab>
        </v-tabs>
      </template>
    </v-app-bar>

    <v-tabs-items v-model="tab">
      <v-tab-item :key="0" value="createQR">
        <CreateQR></CreateQR>
      </v-tab-item>
      <v-tab-item :key="1" value="unmappedCodes">
        <h1>Unmapped</h1>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import CreateQR from './Admin/CreateQR.vue'
export default {
  components: {
    CreateQR
  },
  data: () => ({
    tab: null
  }),
  methods: {
    ...mapActions(['signIn'])
  }
}
</script>
