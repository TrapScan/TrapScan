<template>
  <div>
    <v-stepper elevation="0" v-model="e1">
      <v-stepper-items>
        <v-stepper-content step="1">
          <Card class="mb-6" title="Welcome to TrapScan!">
            TrapScan is a mobile web application designed by conservation
            volunteers to help simplify the administrative parts of their work.
            <br><br>
            You can get involved by clicking the link below to inspect the trap you just scanned!
            <br>
            If you want to get involved, you can register after submitting an inspection!
            <br><br>
            <v-btn @click="goToForm">Inspect Trap</v-btn>
          </Card>

          <Card title="Already involved?" colour="red darken-2">
            Click below to login to your account for the full form.
            <br><br>
            <v-btn @click="goToLogin">Login</v-btn>
          </Card>
        </v-stepper-content>
        <v-stepper-content step="2">
          <AnonSpeciesCaught></AnonSpeciesCaught>
        </v-stepper-content>

        <v-stepper-content step="3">
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
