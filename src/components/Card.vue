<template>
  <div class="card pa-5 mb-2" v-bind:class="colour">
    <h2 v-bind:class="text">{{ title }}</h2>
    <p class="mt-2" v-bind:class="text">
      <slot></slot>
    </p>
  </div>
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
