<template>
<v-container fill-height fluid style="height: 80vh;">
  <v-row align="center"
      justify="center">
      <v-col lg="6">
        <div v-if="showAskForMail">
          <v-form :v-model="valid">
            <h3>Need email again, you're on a different browser</h3>
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="Enter"
              required
            >
              <v-icon slot="prepend">
                mdi-email
              </v-icon>
            </v-text-field>
          </v-form>
          <v-card-actions class="mt-6 flex justify-center">
            <v-btn
              @click="continueWithSignIn"
              large
              class="pl-10 pr-10"
              color="primary"
            >
              Login
            </v-btn>
          </v-card-actions>
        </div>
        <div v-else>
          <h1>Redirecting to dashboard ...</h1>
        </div>
      </v-col>
  </v-row>
</v-container>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data: () => ({
    showAskForMail: false,
    valid: false,
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid'
    ]
  }),
  computed: {
    ...mapGetters(['signInEmail'])
  },
  created () {
    // const url = location.href
    // const email = this.signInEmail
    // Initiate sign in
  },
  methods: {
    continueWithSignIn () {
      // Continue
    }
  }
}
</script>
