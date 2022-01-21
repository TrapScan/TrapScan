<template>
  <div>
    <v-stepper elevation="0" v-model="e1">
      <v-stepper-items>
        <v-stepper-content class="background mt-4" id="anon-step-form" step="1">
          <h1>Welcome to TrapScan</h1>
          <p>This is a mobile web application designed by conservation volunteers to simplify their record keeping and reporting work.</p>
          <Card colour="card_primary">
            <h2 class="mb-3 primary_text--text">Did this trap catch something?</h2>
            <v-btn @click="goToForm">Let us know of a catch</v-btn>
          </Card>

          <Card colour="#faf9f6">
            <h2 class="mt-5 mb-3 card_primary--text">Want to know more?</h2>
            <v-btn to="/anon/about">About Us</v-btn>
          </Card>

          <Card colour="card_secondary">
            <h2 class="mb-3 card_primary--text">Log in to get involved</h2>
            <v-btn @click="goToLogin">Login</v-btn>
            <v-btn class="ml-4" to="/register">Register</v-btn>
          </Card>
        </v-stepper-content>
        <v-stepper-content class="background" step="2">
          <AnonSpeciesCaught></AnonSpeciesCaught>
        </v-stepper-content>

        <v-stepper-content class="background" step="3">
          <AnonConfirmation></AnonConfirmation>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </div>
</template>
<script>
import AnonSpeciesCaught from './AnonSpeciesCaught.vue'
import AnonConfirmation from './AnonConfirmation.vue'
import Card from '../../components/Card.vue'
import { mapGetters } from 'vuex'
export default {
  components: {
    AnonSpeciesCaught,
    AnonConfirmation,
    Card
  },
  methods: {
    goToForm () {
      this.$store.dispatch('anonSetFormIndex', { index: 2 })
    },
    goToLogin () {
      this.$router.push('/')
    }
  },
  computed: {
    ...mapGetters({
      e1: 'anonGetCurrentFormIndex'
    })
  }
}
</script>
<style scoped>
.card {
  background-color: var(--v-cardprimary);
}
#anon-step-form {
  padding: 15px !important;
}
</style>
