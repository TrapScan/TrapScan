<template>
  <div>
    <user-location v-on:location-updated="locationUpdated"></user-location>
    <MapTrap
      :showDialog="dialog"
      :nz_id="nz_id"
      @click:outside="closeDialog"
      v-on:close="closeDialog"
    ></MapTrap>
    <v-overlay v-if="loading" :z-index="100" :value="overlay">
      <v-progress-circular
        class="progress-circle"
        :size="70"
        :width="7"
        color="purple"
        indeterminate
      ></v-progress-circular>
    </v-overlay>
    <div v-if="nearbyTraps.length > 0">
      <v-list class="background" subheader two-line>
        <Trap
          @loading="setLoading"
          v-on:mapCode="mapCode"
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
import MapTrap from '../components/MapTrap.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    Trap,
    UserLocation,
    MapTrap
  },
  data () {
    return {
      dialog: false,
      nz_id: null,
      loading: false
    }
  },
  computed: {
    ...mapGetters(['nearbyTraps'])
  },
  beforeDestroy () {
    this.loading = false
  },
  methods: {
    setLoading () {
      this.loading = true
    },
    mapCode (nzId) {
      this.nz_id = nzId
      this.dialog = true
    },
    locationUpdated (locationData) {
      this.$store.dispatch('nearby', locationData)
    },
    closeDialog () {
      this.dialog = false
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
