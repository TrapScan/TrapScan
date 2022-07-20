<template>
  <v-container fill-height fluid style="height: 80vh">
    <v-row align="center" justify="center">
      <v-col lg="6">
        <success-fail-banner></success-fail-banner>
        <v-form :v-model="valid" ref="resetForm">
          <v-text-field
            v-model="name"
            type="text"
            label="Name"
            required
          >
            <v-icon slot="prepend"> mdi-account </v-icon>
          </v-text-field>
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
          <v-text-field
            v-model="password_confirmation"
            :rules="[passwordConfirmationRule]"
            label="Confirm Password"
            required
            type="password"
          >
            <v-icon slot="prepend"> mdi-lock </v-icon>
          </v-text-field>
        </v-form>
        <v-card-actions class="flex justify-center">
          <v-btn
            @click="register"
            @keydown.enter="register"
            large
            class="pl-10 pr-10"
            color="primary"
          >
            Register
          </v-btn>
        </v-card-actions>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SuccessFailBanner from '../components/SuccessFailBanner.vue'

export default {
  components: { SuccessFailBanner },
  data: () => ({
    valid: false,
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    emailRules: [
      (v) => !!v || 'E-mail is required',
      (v) => /.+@.+/.test(v) || 'E-mail must be valid'
    ],
    passwordRules: [
      (v) => !!v || 'Password is required',
      (v) => v.length > 7 || 'The password must be at least 8 characters'
    ],
    password_confirmationRules: [(v) => (v) => !!v || 'Passwords must match']
  }),
  methods: {
    register () {
      const valid = this.$refs.resetForm.validate()
      if (valid) {
        this.$store.dispatch('register', {
          name: this.name,
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation
        })
          .then((response) => {
            location.reload()
          })
          .catch((error) => {
            this.$store.dispatch('setError', { error: error.response.data })
          })
      }
    }
  },
  computed: {
    baseURL () {
      return process.env.VUE_APP_API_URL
    },
    passwordConfirmationRule () {
      return () =>
        this.password === this.password_confirmation || 'Passwords must match'
    }
  }
}
</script>
<style scoped>
.v-btn {
  width: 100%;
}
</style>
