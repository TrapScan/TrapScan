<template>
  <div style="height: 100%">
    <v-stepper v-model="e1" elevation="0" class="background" style="height: 100%">
       <!-- <v-btn v-if="e1 !== 1" outlined elevation="2" class="ml-4" color="primary" @click="backButton">
          <v-icon left>
            mdi-arrow-left
          </v-icon>Previous Step
        </v-btn> -->
        <v-app-bar app color="background" elevation="10">
          <v-toolbar-title v-if="e1 !== 1" @click="backButton">
            <v-icon large color="primary"> mdi-chevron-left </v-icon>
          </v-toolbar-title>

          <v-spacer></v-spacer>

          <v-btn icon @click="backToScanner">
            <v-icon medium color="primary"> mdi-close </v-icon>
          </v-btn>
      </v-app-bar>
      <v-stepper-header style="display: none;">
        <v-stepper-step :complete="e1 > 1" step="1">
          Checked and
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 2" step="2">
          Empty
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 3" step="3">
          Species Caught
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 4" step="4">
          Something's wrong
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 5" step="5">
          Bait Used
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 6" step="6">
          Summary
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 7" step="7">
          Edit
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 8" step="8">
          Notes
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 9" step="9">
          Confirmation
        </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items style="height: 100%">
        <v-stepper-content style="height: 100%" class="background pa-1 rounded" step="1">
          <OneChecked></OneChecked>
        </v-stepper-content>

        <v-stepper-content style="height: 100%" class="background pa-1 rounded" step="2">
          <TwoEmpty></TwoEmpty>
        </v-stepper-content>

        <v-stepper-content style="height: 100%" class="background pa-1 rounded" step="3">
          <ThreeSpecies></ThreeSpecies>
        </v-stepper-content>

        <v-stepper-content style="height: 100%" class="background pa-1 rounded" step="4">
          <FourSomethingsWrong></FourSomethingsWrong>
        </v-stepper-content>

        <v-stepper-content style="height: 100%" class="background pa-1 rounded" step="5">
          <FiveBaitUsed></FiveBaitUsed>
        </v-stepper-content>

        <v-stepper-content style="height: 100%" class="background pa-1 rounded" step="6">
          <Summary></Summary>
        </v-stepper-content>

        <v-stepper-content style="height: 100%" class="background pa-1 rounded" step="7">
          <SevenEdit></SevenEdit>
        </v-stepper-content>

        <v-stepper-content style="height: 100%" class="background pa-1 rounded" step="8">
          <EightNotes></EightNotes>
        </v-stepper-content>

        <v-stepper-content style="height: 100%" class="background pa-1 rounded" step="9">
          <Confirmation></Confirmation>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import OneChecked from './OneChecked'
import TwoEmpty from './TwoEmpty'
import ThreeSpecies from './ThreeSpecies'
import FourSomethingsWrong from './FourSomethingsWrong'
import FiveBaitUsed from './FiveBaitUsed'
import Summary from './Summary'
import SevenEdit from './SevenEdit'
import EightNotes from './EightNotes'
import Confirmation from './Confirmation'
export default {
  components: {
    OneChecked,
    TwoEmpty,
    ThreeSpecies,
    FourSomethingsWrong,
    FiveBaitUsed,
    Summary,
    SevenEdit,
    EightNotes,
    Confirmation
  },
  data () {
    return {
      test: 1
    }
  },
  computed: {
    ...mapGetters({
      e1: 'getCurrentFormIndex'
    })
  },
  methods: {
    backButton () {
      this.$store.dispatch('formBackNavigate')
    },
    backToScanner () {
      this.$router.replace({ name: 'home' })
    }
  },
  mounted () {
    this.$store.dispatch('setShowNavBar', { navBarState: false })
  },
  beforeDestroy () {
    this.$store.dispatch('setShowNavBar', { navBarState: true })
  }
}
</script>
<style>
.v-stepper__wrapper {
  height: 100%;
}
.form-options{
  height: 100%;
}
</style>
