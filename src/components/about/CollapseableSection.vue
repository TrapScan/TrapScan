<template>
  <v-expansion-panel class="mb-2">
    <!-- <hr /> -->
    <v-expansion-panel-header class="background px-2" expand-icon="mdi-chevron-down">
      <h3 class="extra-space pr-2">{{ title }}</h3>
    </v-expansion-panel-header>
    <v-expansion-panel-content class="hcontent pt-2 rounded">
        <slot></slot>
    </v-expansion-panel-content>
    <!-- <hr v-if="end" /> -->
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
.hcontent {
  background-color: #E4EBF1;
}

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
  line-height: 130% !important;
  color: #163B5E;
  font-size: 115%;
}

hr {
    background-color: gray;
    border: solid 0.5px
}
</style>
