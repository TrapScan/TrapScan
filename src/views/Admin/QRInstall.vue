<template>
  <v-container fill-height fluid style="height: 70vh">
    <v-row align="center" justify="center">
      <v-col lg="6">
        <v-text-field v-model="qr_id" type="text" readonly label="QR Code"></v-text-field>
        <v-text-field v-model="nz_id" type="text" label="NZ ID"></v-text-field>
        <!-- <v-select
          v-model="project"
          :items="items"
          item-text="name"
          item-value="id"
          label="Project (Optional)"
        ></v-select> -->
        <v-row align="center" justify="space-around">
          <v-btn depressed color="primary" @click="submit">
            Map Code
          </v-btn>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  data: () => ({
    nz_id: null,
    qr_id: 'Test-1234'
  }),
  methods: {
    submit () {
      this.$store.dispatch('submitQRMapForm', { nz_id: this.nz_id, qr_id: this.qr_id })
    }
  },
  computed: {
    ...mapGetters(['recentQRs'])
  }
}
</script>
