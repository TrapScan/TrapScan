<template>
  <div>
    <h1>Confirmation</h1>
    <hr>
    <div v-if="loading">
      <v-progress-circular
        :size="70"
        :width="7"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </div>
    <div v-else>
      <h1 v-if="success">Success!</h1>
      <h1 v-else>Failure</h1>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      loading: true,
      success: false
    }
  },
  computed: {
    ...mapGetters({
      user: 'getUser',
      form: 'getForm',
      form_index: 'getFormIndex'
    })
  },
  watch: {
    form_index: function (val) {
      if (val === 9) {
        this.$store.dispatch('submitInspectionForm').then((res) => {
          this.success = true
          this.loading = false
        })
          .catch((error) => {
            this.success = false
            this.loading = false
            console.error(error)
          })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
