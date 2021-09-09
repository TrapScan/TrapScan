<template>
  <div>
    <v-stepper elevation="0" v-model="e1">
      <v-stepper-items>
        <v-stepper-content step="1">
          <AnonSpeciesCaught></AnonSpeciesCaught>
        </v-stepper-content>

        <v-stepper-content step="2">
          <AnonConfirmation></AnonConfirmation>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </div>
</template>
<script>
import AnonSpeciesCaught from './AnonSpeciesCaught.vue'
import AnonConfirmation from './AnonConfirmation.vue'
import { mapGetters } from 'vuex'
export default {
  components: {
    AnonSpeciesCaught,
    AnonConfirmation
  },
  computed: {
    ...mapGetters({
      e1: 'anonGetCurrentFormIndex'
    })
  }
}
</script>
