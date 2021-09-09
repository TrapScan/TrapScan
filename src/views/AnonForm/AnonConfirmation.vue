<template>
  <div>
    <div v-if="loading">
      <v-progress-circular
        :size="70"
        :width="7"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </div>
    <div v-else>
      <div v-if="success">
        <h2 class="pb-2">Thanks for letting us know!</h2>
        <p>
          If you want to get full access to the TrapScan app please
          <a href="/register">sign up</a>. or <a href="/">log in</a>
        </p>
        <v-card-actions>
          <v-btn class="primary" block to="/register">Register</v-btn>
        </v-card-actions>
        <v-card-actions>
          <v-btn class="secondary" block primary to="/">Log In</v-btn>
        </v-card-actions>
      </div>
      <div v-else>
        <h2>Whoops</h2>
        <p>Something went wrong when submitting the inspection.</p>
        <p>The owners have been notified!</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      success: false,
      loading: true
    }
  },
  computed: {
    ...mapGetters({
      user: 'getUser',
      form: 'anonGetForm',
      form_index: 'anonGetCurrentFormIndex'
    })
  },
  watch: {
    form_index: function (val) {
      if (val === 2) {
        this.$store
          .dispatch('anonSubmitInspectionForm', {
            code: this.$route.params.code
          })
          .then((res) => {
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
a {
  text-decoration: none;
}
</style>
