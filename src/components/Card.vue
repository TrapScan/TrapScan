<template>
  <v-card class="pa-3 mb-2" elevation="0" :color="colour" rounded="0">
    <h2 v-bind:class="text">{{ title }}</h2>
    <p class="mt-2" v-bind:class="text">
      <slot></slot>
    </p>
  </v-card>
</template>

<script>
export default {
  props: {
    title: {
      type: String
    },
    colour: {
      type: String,
      default: 'primary'
    },
    text: {
      type: String,
      default: 'white--text'
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
