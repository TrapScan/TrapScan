
<template>
  <v-list-item class="card my-3">
    <v-list-item-content>
      <v-list-item-title>
        {{ trap.name }}
        </v-list-item-title>
      <v-list-item-subtitle>
        <span class="font-weight-black">Distance: </span>{{ trap.distance }}
      </v-list-item-subtitle>
      <v-list-item-subtitle>
        <span class="font-weight-bold">QR ID: </span>{{ trap.qr_id }}
      </v-list-item-subtitle>
      <v-list-item-subtitle>
        <span class="font-weight-bold">NZ ID: </span>{{ trap.nz_trap_id }}
      </v-list-item-subtitle>
    </v-list-item-content>

    <v-list-item-action class="align-baseline">
      <span v-if="this.trap.qr_id === null">
        <v-btn class="red white--text" @click="map" :disabled="! trap.nz_trap_id"> Map Trap </v-btn>
      </span>
      <span v-else>
        <v-icon class="mr-4" :style="style">mdi-navigation</v-icon>
        <v-btn class="primary" @click="scan" :disabled="! trap.nz_trap_id"> Scan Trap </v-btn>
      </span>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
export default {
  props: {
    trap: {
      type: Object
    }
  },
  methods: {
    scan () {
      this.$store.dispatch('scanQR', { qr_id: this.trap.qr_id })
    },
    map () {
      this.$emit('mapCode', this.trap.nz_trap_id)
    }
  },
  computed: {
    style () {
      return { transform: 'rotate(' + this.trap.compassBearing + 'deg) !important' }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
