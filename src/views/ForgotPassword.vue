<template>
  <v-container fill-height fluid style="height: 80vh">
    <v-row align="center" justify="center">
      <v-col lg="6">
        <success-fail-banner></success-fail-banner>
        <v-form :v-model="valid">
          <v-text-field
            v-model="email"
            :rules="emailRules"
            type="email"
            label="Email"
            required
          >
            <v-icon slot="prepend"> mdi-email </v-icon>
          </v-text-field>
        </v-form>
        <v-card-actions class="flex justify-center">
          <v-btn
            @click="submit"
            @keydown.enter="submit"
            large
            :loading="loading"
            class="pl-10 pr-10"
            color="primary"
          >
            Send Reset Link
          </v-btn>
        </v-card-actions>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios'
import { mapActions } from 'vuex'
import SuccessFailBanner from '../components/SuccessFailBanner.vue'

export default {
  components: { SuccessFailBanner },
  data: () => ({
    valid: false,
    loading: false,
    email: '',
    emailRules: [
      (v) => !!v || 'E-mail is required',
      (v) => /.+@.+/.test(v) || 'E-mail must be valid'
    ]
  }),
  methods: {
    ...mapActions(['signIn']),
    async submit () {
      this.loading = true
      axios.post('/password/email', {
        email: this.email
      }).then((response) => {
        this.loading = false
        this.$store.dispatch('setSuccess', { success: response.data })
      }).catch((error) => {
        this.loading = false
        this.$store.dispatch('setError', { error: error.response.data })
      })
    }
  },
  computed: {
    baseURL () {
      return process.env.VUE_APP_API_URL
    }
  }
}
</script>
<style scoped>
.v-btn{
  width: 100%;
}
</style>
