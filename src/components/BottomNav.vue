<template>
  <v-bottom-navigation v-model="value" color="primary">
    <v-btn value="dashboard" to="/dashboard">
      <span>Data</span>
      <v-icon>mdi-home</v-icon>
    </v-btn>

    <v-btn value="scan" to="/scan">
      <span>Scan</span>
      <v-icon>mdi-cube-scan</v-icon>
    </v-btn>

    <v-btn value="history">
      <span>About</span>

      <v-icon>mdi-information</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>
<script>
export default {
  data: () => ({ value: 'recent' })
}
</script>
