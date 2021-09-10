<template>
  <div>
    <user-location v-on:location-updated="locationUpdated"></user-location>
    <div v-if="nearbyTraps.length > 0">
      <v-list class="background" subheader two-line>
        <Trap
          class="rounded"
          v-for="trap in nearbyTraps"
          :key="trap.id"
          :trap="trap"
        ></Trap>
      </v-list>
    </div>
  </div>
</template>

<script>
import UserLocation from '../components/UserLocation.vue'
import Trap from '../components/Trap.vue'

import { mapGetters } from 'vuex'

export default {
  components: {
    Trap,
    UserLocation
  },
  computed: {
    ...mapGetters(['nearbyTraps'])
  },
  methods: {
    locationUpdated (locationData) {
      console.log(locationData)
      this.$store.dispatch('nearby', locationData)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
