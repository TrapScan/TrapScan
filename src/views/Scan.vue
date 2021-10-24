<template>
  <div>
    <v-tabs centered background-color="transparent" v-model="tab">
      <v-tab key="location">Nearby Traps</v-tab>
      <v-tab key="camera">QR Scanner</v-tab>
      <!-- <v-tab key="heading">Heading</v-tab> -->
    </v-tabs>
    <v-alert dismissible class="ma-0 mt-2 rounded-0" v-if="scanError" type="error">
        {{ scanError }}
     </v-alert>
    <v-tabs-items v-model="tab">
      <v-tab-item class="background" key="location">
        <Location></Location>
      </v-tab-item>
      <v-tab-item key="camera">
        <Camera></Camera>
      </v-tab-item>
      <!-- <v-tab-item key="heading">
        <UserHeading></UserHeading>
      </v-tab-item> -->
    </v-tabs-items>
  </div>
</template>
<script>
import Camera from '../components/Camera.vue'
import Location from '../components/Location.vue'
import { mapGetters } from 'vuex'
// import UserHeading from '../components/UserHeading.vue'
export default {
  components: {
    Camera,
    Location
    // UserHeading
  },
  data () {
    return {
      tab: null
    }
  },
  props: {
    initial_code: {
      type: String,
      default: null
    }
  },
  mounted () {
    if (this.initial_code) {
      this.$store.dispatch('scanQR', { qr_id: this.initial_code })
    }
    if (this.isCoordinator) {
      this.$store.dispatch('fetchUnmappedCodes')
    }
  },
  computed: {
    ...mapGetters(['scanError', 'isCoordinator'])
  },
  methods: {}
}
</script>
<style scoped>
</style>
