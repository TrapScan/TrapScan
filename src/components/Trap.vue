
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
        <span class="font-weight-bold">NZ ID: </span>{{ trap.nz_trap_id }}
      </v-list-item-subtitle>
      <v-list-item-subtitle>
        <span class="font-weight-bold">QR ID: </span>{{ 'Test-1234' }}
      </v-list-item-subtitle>
    </v-list-item-content>

    <v-list-item-action class="align-baseline">
      <span>
        <v-icon class="mr-4" :style="style">mdi-navigation</v-icon>
        <v-btn class="primary"> Scan Trap </v-btn>
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
  computed: {
    style () {
      return { transform: 'rotate(' + this.trap.compassBearing + 'deg) !important' }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
