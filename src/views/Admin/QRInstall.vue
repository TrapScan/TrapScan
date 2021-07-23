<template>
  <v-form ref="form">
    <v-container fill-height fluid style="height: 70vh">
      <v-row align="center" justify="center">
        <v-col lg="6">
          <v-text-field
            required
            v-model="qr_id"
            :rules="[(v) => !!v || 'QR/Trap ID is required']"
            type="text"
            label="QR Code"
          ></v-text-field>
          <v-text-field
            required
            :rules="[(v) => !!v || 'NZ ID is required']"
            v-model="nz_id"
            type="text"
            label="NZ ID"
          ></v-text-field>
          <!-- <v-select
          v-model="project"
          :items="items"
          item-text="name"
          item-value="id"
          label="Project (Optional)"
        ></v-select> -->
          <message-banner></message-banner>
          <v-row align="center" justify="space-around">
            <v-btn depressed color="primary" @click="submit"> Map Code </v-btn>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'QRInstall',
  data () {
    return {
      nz_id: null,
      qr_id: this.scannedCodeValue
    }
  },
  methods: {
    submit () {
      this.$store
        .dispatch('submitQRMapForm', { nz_id: this.nz_id, qr_id: this.qr_id })
        .then((response) => {
          this.nz_id = null
          this.qr_id = null
          this.$store.dispatch('setSuccess', { success: response.data })
        })
        .catch((error) => {
          this.$refs.form.validate()
          this.$store.dispatch('setError', { error: error.response.data })
        })
    }
  },
  computed: {
    ...mapGetters(['recentQRs', 'scannedCodeValue'])
  }
}
</script>
