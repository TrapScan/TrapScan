<template>
  <v-container fill-height fluid style="height: 80vh">
    <v-row align="center" justify="center">
      <v-col lg="6">
        <!-- <v-card elevation="1" class="pa-6 rounded"> -->
        <!-- <v-img
            height="250"
            class="rounded mb-8"
            src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
          ></v-img> -->
        <v-form :v-model="valid">
          <v-text-field
            v-model="email"
            :rules="emailRules"
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
          <v-btn @click="submit" @keydown.enter="submit" large class="pl-10 pr-10" color="primary">
            Login
          </v-btn>
        </v-card-actions>
        <v-card-actions class="mt-8 flex justify-center">
          <v-btn
            width="65%"
            @click="loginWithGooglePopUp"
            large
            class="pl-10 pr-10"
            color="primary"
          >
            Login with Google
          </v-btn>
        </v-card-actions>
        <v-card-actions class="flex justify-center">
          <v-btn
            width="65%"
            @click="loginWithFacebook"
            large
            class="pl-10 pr-10"
            color="primary"
          >
            Login with Facebook
          </v-btn>
        </v-card-actions>
        <!-- </v-card> -->
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
    ...mapActions([
      'signIn'
    ]),
    async submit () {
      await this.signIn({ email: this.email, password: this.password })

      this.$router.replace({ name: 'home' })
    },
    login () {
      this.$store.dispatch('signIn', {
        email: this.email,
        password: this.password
      })
    },
    loginWithGooglePopUp () {
      this.$store.dispatch('loginWithGooglePopUp')
    },
    loginWithFacebook () {
      this.$store.dispatch('loginWithFacebookPopUp')
    }
  }
}
</script>
