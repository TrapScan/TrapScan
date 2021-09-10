<template>
  <div class="mt-3 text-center">
    <v-btn :loading="loading" class="mb-4 p-4" @click="locate" color="primary">
      <v-icon
        class="mr-2"
        v-bind:class="{ pulse: scanning }"
        :color="iconColour"
        dark
      >
        mdi-crosshairs-gps
      </v-icon>
      <span v-if="!scanning">Tap to start scanning</span>
      <span v-else>Automatically scanning..</span>
    </v-btn>
    <v-alert v-if="this.error" text prominent type="error">
      <strong>{{ error }}</strong>
    </v-alert>
  </div>
</template>

<script>
export default {
  data () {
    return {
      location: null,
      count: 0,
      error: null,
      scanning: false,
      watchID: null,
      loading: false
    }
  },
  methods: {
    locate () {
      if (!this.scanning) {
        this.loading = true
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.scanning = true
            this.location = {
              lat: position.coords.latitude,
              long: position.coords.longitude,
              heading: position.coords.heading,
              speed: position.coords.speed,
              altitude: position.coords.altitude
            }
            this.$emit('location-updated', this.location)
            this.loading = false
            // Start watcher
            this.watchID = navigator.geolocation.watchPosition(
              (position) => {
                this.location = {
                  lat: position.coords.latitude,
                  long: position.coords.longitude,
                  heading: position.coords.heading,
                  speed: position.coords.speed,
                  altitude: position.coords.altitude
                }
                this.$emit('location-updated', this.location)
              },
              (error) => {
                this.loading = false
                this.error = error.message
              }
            )
          },
          (error) => {
            this.error = error.message
          }
        )
      } else {
        // Stop Scanning
        this.scanning = false
        navigator.geolocation.clearWatch(this.watchID)
        this.watchID = null
      }
    }
  },
  computed: {
    iconColour () {
      return this.scanning ? 'red' : 'white'
    }
  }
}
</script>

<style lang="scss" scoped>
@keyframes pulse {
  0% {
    opacity: 100%;
  }
  50% {
    opacity: 50%;
  }
  100% {
    opacity: 100%;
  }
}

.pulse {
  animation-name: pulse;
  animation-duration: 2s;
  animation-iteration-count: infinite;
  color: red;
}
</style>
