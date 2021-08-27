<template>
  <v-container fill-height fluid style="height: 80vh">
    <v-row align="center" justify="center">
      <v-col lg="6">
        <success-fail-banner></success-fail-banner>
        <v-form :v-model="valid" ref="resetForm">
          <v-text-field
            v-model="email"
            :rules="emailRules"
            type="email"
            label="Email"
            readonly
            disabled
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
            @click="resetPassword"
            @keydown.enter="resetPassword"
            large
            class="pl-10 pr-10"
            color="primary"
          >
            Reset Password
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
    token: '',
    email: '',
    password: '',
    password_confirmation: '',
    emailRules: [
      (v) => !!v || 'E-mail is required',
      (v) => /.+@.+/.test(v) || 'E-mail must be valid'
    ],
    passwordRules: [
      (v) => !!v || 'Password is required',
      (v) => v.length > 6 || 'Password must be longer than 6 characters'
    ],
    password_confirmationRules: [(v) => (v) => !!v || 'Passwords must match']
  }),
  mounted () {
    this.token = this.$route.params.token
    this.email = this.$route.query.email
  },
  methods: {
    resetPassword () {
      const valid = this.$refs.resetForm.validate()
      if (valid) {
        this.$store
          .dispatch('resetPassword', {
            token: this.token,
            email: this.email,
            password: this.password,
            password_confirmation: this.password
          })
          .then((response) => {
            this.$store.dispatch('setSuccess', { success: response.data })
            location.reload()
          })
          .catch((error) => {
            this.$refs.resetForm.validate()
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
