<template>
  <v-bottom-navigation v-model="value" color="primary">
    <v-btn value="dashboard" to="/dashboard" class="bottom-nav-icons">
      <span>Data</span>
      <v-icon>mdi-chart-line</v-icon>
    </v-btn>

    <v-btn value="scan" to="/scan" class="bottom-nav-icons">
      <span>Scan</span>
      <v-icon>mdi-line-scan</v-icon>
    </v-btn>

    <v-btn value="about" to="/about" class="bottom-nav-icons">
      <span>About</span>
      <v-icon>mdi-book-open-blank-variant</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>
<script>
export default {
  data: () => ({ value: 'recent' })
}
</script>
<style scoped>
.bottom-nav-icons {
  padding-bottom: 12px !important;
}
</style>
