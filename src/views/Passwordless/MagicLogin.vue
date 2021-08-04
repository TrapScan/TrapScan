<template>
<v-container fill-height fluid style="height: 80vh;">
  <v-row align="center"
      justify="center">
      <v-col v-if="!showInstructions" lg="6">
          <v-form :v-model="valid">
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
              @click="login"
              large
              class="pl-10 pr-10"
              color="primary"
            >
              Send Magic Link
            </v-btn>
        </v-card-actions>
        <!-- </v-card> -->
      </v-col>
      <v-col v-else lg="6">
        <h3>Email sent to {{ this.email }}</h3>
      </v-col>
  </v-row>
</v-container>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  data: () => ({
    valid: false,
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid'
    ],
    showInstructions: false
  }),
  methods: {
    login () {
      // Handle
    },
    ...mapActions(['signIn'])
  }
}
</script>
