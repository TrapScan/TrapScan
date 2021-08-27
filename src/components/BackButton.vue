<template>
  <div>
    <v-toolbar-title>
      <v-icon large color="primary" @click="goBack" class="justify-self-end">
        mdi-chevron-left
      </v-icon>
    </v-toolbar-title>
  </div>
</template>

<script>
export default {
  methods: {
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
