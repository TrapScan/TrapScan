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

      <template v-slot:extension>
        <v-tabs color="white" v-model="tab" align-with-title>
          <v-tab href="#createQR">Create QR Codes</v-tab>
          <v-tab href="#unmappedTraps">Unmapped Traps</v-tab>
          <v-tab href="#unmappedCodes">Unmapped Codes</v-tab>
          <v-tab href="#mappedTraps">All Traps</v-tab>
          <v-tab href="#scrapeData">Trap NZ Data</v-tab>
        </v-tabs>
      </template>
    </v-app-bar>

    <v-tabs-items v-model="tab">
      <v-tab-item :key="0" value="createQR">
        <CreateQR></CreateQR>
      </v-tab-item>
      <v-tab-item :key="1" value="unmappedTraps">
        <Unmapped v-if="tab === 'unmappedTraps'"></Unmapped>>
      </v-tab-item>
      <v-tab-item :key="2" value="unmappedCodes">
        <UnmappedCodes v-if="tab === 'unmappedCodes'"></UnmappedCodes>>
      </v-tab-item>
      <v-tab-item :key="3" value="mappedTraps">
        <Traps v-if="tab === 'mappedTraps'"></Traps>>
      </v-tab-item>
      <v-tab-item :key="4" value="scrapeData">
        <Scrape v-if="tab === 'scrapeData'"></Scrape>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>
<script>
import CreateQR from './Admin/CreateQR.vue'
import Unmapped from './Admin/Unmapped.vue'
import UnmappedCodes from './Admin/UnmappedCodes.vue'
import Traps from './Admin/Traps.vue'
import Scrape from './Admin/Scrape.vue'

export default {
  components: {
    CreateQR,
    Unmapped,
    UnmappedCodes,
    Traps,
    Scrape
  },
  data: () => ({
    tab: null
  }),
  mounted () {
    this.$store.dispatch('setShowNavBar', { navBarState: false })
    // Preload the data for each admin section
    this.$store.dispatch('fetchTraps')
    this.$store.dispatch('fetchNoCodes')
    this.$store.dispatch('fetchUnmappedCodes')
  },
  beforeDestroy () {
    this.$store.dispatch('setShowNavBar', { navBarState: true })
  }
}
</script>
