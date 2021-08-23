<template>
  <div>
    <v-stepper v-model="e1">
       <!-- <v-btn v-if="e1 !== 1" outlined elevation="2" class="ml-4 mt-4" color="secondary" @click="backButton">
          <v-icon left>
            mdi-arrow-left
          </v-icon>Previous Step
        </v-btn> -->
      <v-stepper-header style="display: none;">
        <v-stepper-step :complete="e1 > 1" step="1">
          Species Caught
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 4" step="4">
          Thank you!
        </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <AnonSpeciesCaught></AnonSpeciesCaught>
        </v-stepper-content>

        <v-stepper-content step="2">
          <h1>Thank You!</h1>
          <p>Your inspection has been recorded</p>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </div>
</template>
<script>
import AnonSpeciesCaught from './AnonSpeciesCaught.vue'
import { mapGetters } from 'vuex'
export default {
  components: {
    AnonSpeciesCaught
  },
  computed: {
    ...mapGetters({
      e1: 'anonGetCurrentFormIndex'
    })
  }
}
</script>
