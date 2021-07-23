<template>
  <v-row v-if="showForm" align="center" justify="space-around">
    <v-alert text prominent :type="formErrorStatus" :icon="icon">
      <strong>{{ formErrorMessage }}</strong>
      <ul v-if="formErrorList">
          <div v-for="(errors, key) in formErrorList" :key="key">
              <li v-for="error in errors" :key="error">{{ error }}</li>
          </div>
      </ul>
    </v-alert>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    type: {
      type: String,
      default: 'error'
    },
    message: {
      type: String,
      default: 'This operation did not complete'
    },
    icon: {
      type: String,
      default: 'mdi-alert-circle'
    },
    errorList: {
      type: Object,
      default: null
    }
  },
  computed: {
    getIcon () {
      return this.type === 'error' ? 'mdi-alert-circle' : 'mdi-check'
    },
    showForm () {
      return this.formErrorStatus === 'error' || this.formErrorStatus === 'success' ||
      this.formErrorStatus === 'warning' || this.formErrorStatus === 'info'
    },
    ...mapGetters(['formErrorStatus', 'formErrorMessage', 'formErrorList'])
  },
  // Unload the errors so it won't show when a user opens another form
  destroyed () {
    this.$store.dispatch('clearFormStatus')
  }
}
</script>

<style lang="scss" scoped>
</style>
