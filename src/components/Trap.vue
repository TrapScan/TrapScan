
<template>
  <v-list-item class="card my-3">
    <v-list-item-content>
      <v-list-item-title>{{ trap.name }}</v-list-item-title>
      <v-list-item-subtitle>{{ trap.nz_trap_id }}</v-list-item-subtitle>
    </v-list-item-content>

    <v-list-item-action>
      <v-btn class="primary"> Scan Trap </v-btn>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
export default {
  props: {
    trap: {
      type: Object
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
