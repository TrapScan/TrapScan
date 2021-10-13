<template>
  <v-expansion-panel class="mb-2 mx-4">
    <hr />
    <v-expansion-panel-header class="background" expand-icon="mdi-menu-down">
      <h3 class="extra-space">{{ title }}</h3>
    </v-expansion-panel-header>
    <v-expansion-panel-content class="background">
        <slot></slot>
    </v-expansion-panel-content>
    <hr v-if="end" />
  </v-expansion-panel>
</template>

<script>
export default {
  props: {
    title: {
      type: String
    },
    end: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
#intro {
  font-size: 1.3rem;
  line-height: 120%;
  margin-bottom: 0 !important;
}

#documentary-link {
  font-weight: bold;
  padding: 6px;
  border-radius: 5px;
}

.blurb {
  margin-bottom: 0 !important;
}

.extra-space {
  line-height: 150% !important;
}

hr {
    background-color: gray;
    border: solid 0.5px
}
</style>
