<template>
    <div>
        <p>Alpha: {{alpha}}</p>
        <p>Beta:  {{beta}}</p>
        <p>Gamma: {{gamma}}</p>
        <p>Apple: {{apple}}</p>
    </div>
</template>

<script>
export default {
  data () {
    return {
      alpha: 0,
      beta: 0,
      gamma: 0,
      apple: 0
    }
  },
  mounted () {
    if (window.DeviceOrientationEvent) {
      console.log('Found')
      window.addEventListener('deviceorientation', function (event) {
        // alpha: rotation around z-axis
        this.alpha = event.alpha
        // gamma: left to right
        this.gamma = event.gamma
        // beta: front back motion
        this.beta = event.beta
        if (event.webkitCompassHeading) {
          // Apple works only with this, alpha doesn't work
          console.log('Apple....')
          console.log(event.webkitCompassHeading)
          this.apple = event.webkitCompassHeading
        }
        console.log(event)
      }, true)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
