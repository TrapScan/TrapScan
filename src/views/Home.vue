<template>
  <v-container fill-height fluid style="height: 80vh">
    <v-row align="center" justify="center">
      <v-col lg="6">
        <success-fail-banner></success-fail-banner>
        <v-form :v-model="valid">
          <v-text-field
            v-model="email"
            :rules="emailRules"
            @keydown.native.enter="submit"
            type="email"
            label="Email"
            required
          >
            <v-icon slot="prepend"> mdi-email </v-icon>
          </v-text-field>

          <v-text-field
            v-model="password"
            :rules="passwordRules"
            @keydown.native.enter="submit"
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
            :loading="loading"
            large
            class="pl-10 pr-10"
            color="primary"
          >
            Login
          </v-btn>
        </v-card-actions>
        <v-card-actions>
          <v-btn
            outlined
            to="/register"
            :loading="loading"
            color="primary"
            >Register Now</v-btn
          >
        </v-card-actions>
        <v-row>
          <v-col>
            <v-card-actions class="flex justify-center">
              <a
                class="
                  py-3
                  v-btn v-btn--is-elevated v-btn--has-bg
                  theme--light
                  is-google
                "
                :href="baseURL + '/auth/google/redirect'"
                :loading="loading"
                ><v-icon color="white">mdi-google</v-icon></a
              >
            </v-card-actions>
          </v-col>
          <v-col>
            <v-card-actions class="flex justify-center">
              <a
                class="
                  py-3
                  v-btn v-btn--is-elevated v-btn--has-bg
                  theme--light
                  is-facebook
                "
                :href="baseURL + '/auth/facebook/redirect'"
                :loading="loading"
                ><v-icon color="white">mdi-facebook</v-icon></a
              >
            </v-card-actions>
          </v-col>
          <v-col>
            <v-card-actions>
              <a
                class="
                  py-3
                  v-btn v-btn--is-elevated v-btn--has-bg
                  theme--light
                  is-apple
                "
                :href="baseURL + '/auth/apple/redirect'"
                :disabled="loading"
                ><v-icon color="white">mdi-apple</v-icon></a
              >
            </v-card-actions>
          </v-col>
        </v-row>
        <v-card-actions>
          <v-btn
            text
            to="/i/forgot/password"
            :loading="loading"
            outlined
            color="primary"
            >Forgot your password?</v-btn
          >
        </v-card-actions>
        <v-card-actions class="mt-4">
          <v-btn
            to="/anon/about"
            :loading="loading"
            color="primary"
            >About Us</v-btn
          >
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

.is-facebook {
  background-color: #1877f2 !important;
}
.is-google {
  background-color: #ea4335 !important;
}

.is-apple {
  background-color: #000000 !important;
}
</style>
