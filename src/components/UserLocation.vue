<template>
<div>
  <v-btn class="mb-4 p-4" fab small @click="locate" color="primary">
    <v-icon dark> mdi-crosshairs-gps </v-icon>
  </v-btn>
  <v-alert text prominent type="info">
      <strong>{{ thing }}</strong>
    </v-alert>
    <v-alert text prominent type="error">
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
      thing: 'None',
      error: 'None'
    }
  },
  methods: {
    locate () {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.location = {
            lat: position.coords.latitude,
            long: position.coords.longitude
          }
          this.$emit('locationUpdated', this.location)
          // Start watcher
          navigator.geolocation.watchPosition(
            (position) => {
              this.location = {
                lat: position.coords.latitude,
                long: position.coords.longitude
              }
              this.$emit('locationUpdated', this.location)
              this.thing = 'Count ' + this.count + ' ' + this.location.lat + ' : ' + this.location.long
              this.count++
            },
            (error) => {
              this.error = error.message
            }
          )
        },
        (error) => {
          this.error = error.message
        }
      )
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
