<template>
  <div>
    <v-sheet v-if="!loading && success" color="success" id="success-banner" class="d-flex align-center justify-center">
      <v-icon x-large>mdi-check</v-icon>
    </v-sheet>
    <div v-if="loading">
      <v-progress-circular :size="70" :width="7" color="primary" indeterminate></v-progress-circular>
    </div>
    <div id="success-info" v-else>
      <div class="pa-3" v-if="success">
        <h1 class="text-center">Success</h1>
        <h4 class="text-center">Your inspection has been recorded</h4>
        <div class="mt-6">
          <p>
            This trap was last checked
            <b>{{ formatDate }}</b> by
            <b>{{ lastCheckedBy }}</b>
          </p>
          <p v-if="lastCaught">
            The trap last caught a
            <b>{{ lastCaught }}</b>
          </p>
          <p>Total catches on this trap: {{ totalCatches }}</p>
        </div>
        <v-btn block class="mt-6" x-large to="/scan">Finish</v-btn>
      </div>
      <h1 v-else>Failure</h1>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      loading: true,
      success: false
    }
  },
  computed: {
    ...mapGetters({
      user: 'getUser',
      form: 'getForm',
      form_index: 'getFormIndex'
    }),
    formatDate () {
      return this.$store.state.scan.scannedTrap.last_checked
    },
    lastCheckedBy () {
      return this.$store.state.scan.scannedTrap.last_checked_by
    },
    lastCaught () {
      return this.$store.state.scan.scannedTrap.last_caught
    },
    totalCatches () {
      return this.$store.state.scan.scannedTrap.total_catches
    }
  },
  watch: {
    form_index: function (val) {
      if (val === 9) {
        this.$store.dispatch('submitInspectionForm').then((res) => {
          this.success = true
          this.loading = false
        })
          .catch((error) => {
            this.success = false
            this.loading = false
            console.error(error)
          })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#success-banner {
  position: fixed;
  height: 20vh;
  left: 0;
  right: 0;
}
#success-info {
  padding-top: 20vh;
}
</style>
