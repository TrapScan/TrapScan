<template>
  <v-container fluid id="login-page" class="fill-height">
    <!-- <div class="d-flex align-center justify-center" style="width: 100%">
      Log in with your Google, Facebook, or Apple account
    </div>-->
    <v-row
      no-gutters
      class="socials"
      justify="center text-center"
    >Log in with your Google, Facebook, or Apple account</v-row>
    <v-row no-gutters class="socials">
      <v-col>
        <v-card-actions class="flex justify-center">
          <a
            class="py-3 v-btn v-btn--is-elevated v-btn--has-bg theme--light is-google"
            :href="baseURL + '/auth/google/redirect'"
            :loading="loading"
          >
            <v-icon color="white">mdi-google</v-icon>
          </a>
        </v-card-actions>
      </v-col>
      <v-col>
        <v-card-actions class="flex justify-center">
          <a
            class="py-3 v-btn v-btn--is-elevated v-btn--has-bg theme--light is-facebook"
            :href="baseURL + '/auth/facebook/redirect'"
            :loading="loading"
          >
            <v-icon color="white">mdi-facebook</v-icon>
          </a>
        </v-card-actions>
      </v-col>
      <v-col>
        <v-card-actions>
          <a
            class="py-3 v-btn v-btn--is-elevated v-btn--has-bg theme--light is-apple"
            :href="baseURL + '/auth/apple/redirect'"
            :disabled="loading"
          >
            <v-icon color="white">mdi-apple</v-icon>
          </a>
        </v-card-actions>
      </v-col>
    </v-row>
    <v-spacer></v-spacer>

    <v-row no-gutters justify="space-around" align="baseline">
      <v-col class="divide"></v-col>
      <v-col class="text-center">
        <i>OR</i>
      </v-col>
      <v-col class="divide"></v-col>
    </v-row>

    <v-row no-gutters class="socials" justify="center text-center">Log in with Email</v-row>

    <v-row no-gutters align="center" justify="center">
      <v-col>
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
            <v-icon slot="prepend">mdi-email</v-icon>
          </v-text-field>

          <v-text-field
            v-model="password"
            :rules="passwordRules"
            @keydown.native.enter="submit"
            label="Password"
            required
            type="password"
          >
            <v-icon slot="prepend">mdi-lock</v-icon>
          </v-text-field>
        </v-form>
        <v-card-actions class="flex justify-center">
          <v-btn
            @click="submit"
            elevation="0"
            :loading="loading"
            large
            class="pl-10 pr-10 primary-button"
          >Login</v-btn>
        </v-card-actions>
        <v-card-actions>
          <v-btn to="/register" elevation="0" :loading="loading" class="secondary-button">Register</v-btn>
        </v-card-actions>
        <v-card-actions>
          <v-btn
            text
            to="/i/forgot/password"
            :loading="loading"
            class="secondary-button"
          >Reset password</v-btn>
        </v-card-actions>

        <v-card-actions class="">
          <v-btn to="/anon/about" class="about-button" text :loading="loading">About TrapScan</v-btn>
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
#login-page {
  font-family: "Montserrat";
  font-weight: 400;
  max-width: 600px;
}
.primary-button {
  background-color: #286ea2 !important;
  color: #ffffff;
  text-transform: none;
}
.secondary-button {
  background-color: #abc2d280 !important;
  color: #286ea2;
  text-transform: none;
}
.about-button {
  font-size: 80%;
  color: #009E73;
  text-decoration: underline;
  text-transform: none;
}
.socials {
  font-family: "Montserrat";
  font-weight: 600;
  color: #737271;
}
.divide {
  border-bottom: 1px solid;
}
.v-btn {
  width: 100%;
}

.is-facebook {
  background-color: #286ea2 !important;
}
.is-google {
  background-color: #d44944 !important;
}

.is-apple {
  background-color: #182532 !important;
}
</style>
