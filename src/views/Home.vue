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

          <v-text-field
            v-model="password"
            :rules="passwordRules"
            label="Password"
            required
            type="password"
          >
            <v-icon slot="prepend"> mdi-lock </v-icon>
          </v-text-field>
        </v-form>
        <v-card-actions class="flex justify-center">
          <v-btn
            @click="submit"
            @keydown.enter="submit"
            :loading="loading"
            large
            class="pl-10 pr-10"
            color="primary"
          >
            Login
          </v-btn>
        </v-card-actions>
        <v-card-actions class="mt-8 flex justify-center">
          <a
            class="
              pl-10
              pr-10
              v-btn v-btn--is-elevated v-btn--has-bg
              theme--light
              v-size--large
              primary
            "
            :href="baseURL + '/auth/google/redirect'"
            :loading="loading"
            >Login with Google</a
          >
        </v-card-actions>
        <v-card-actions class="flex justify-center">
          <a
            class="
              pl-10
              pr-10
              v-btn v-btn--is-elevated v-btn--has-bg
              theme--light
              v-size--large
              primary
            "
            :href="baseURL + '/auth/facebook/redirect'"
            :loading="loading"
            >Login with Facebook</a
          >
        </v-card-actions>
        <v-card-actions>
          <a
            class="
              pl-10
              pr-10
              v-btn v-btn--is-elevated v-btn--has-bg
              theme--light
              v-size--large
              primary
            "
            :href="baseURL + '/auth/apple/redirect'"
            :disabled="loading"
            >Login with Apple</a
          >
        </v-card-actions>
        <v-card-actions>
          <v-btn text to="/i/forgot/password" :loading="loading" outlined color="primary">Forgot your password?</v-btn>
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
    loading: false,
    valid: false,
    email: '',
    emailRules: [
      (v) => !!v || 'E-mail is required',
      (v) => /.+@.+/.test(v) || 'E-mail must be valid'
    ],
    password: '',
    passwordRules: [
      (v) => !!v || 'Password is required',
      (v) => v.length > 6 || 'Password must be longer than 6 characters'
    ]
  }),
  methods: {
    ...mapActions(['signIn']),
    async submit () {
      this.loading = true
      await this.signIn({ email: this.email, password: this.password })
        .then(() => {
          this.loading = false
          this.$router.replace({ name: 'home' })
        })
        .catch((error) => {
          this.loading = false
          this.$store.dispatch('setError', { error: error.response.data })
        })
    },
    loginWithGooglePopUp () {
      axios.get('/auth/google/redirect')
    },
    loginWithFacebook () {
      this.$store.dispatch('loginWithFacebookPopUp')
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
.v-btn {
  width: 100%;
}
</style>
