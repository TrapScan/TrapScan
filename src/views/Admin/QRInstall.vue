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
            :disabled="!scanAdmin"
            label="QR Code"
          ></v-text-field>
          <v-autocomplete
            v-model="trap"
            :items="trapList"
            outlined
            item-text="name"
            label="Trap to Map"
            placeholder="Type to search unmapped traps"
            return-object
            clearable
            filled
            solo
          >
            <template v-slot:item="data">
              <v-list-item-content>
                <v-list-item-title v-html="data.item.name"></v-list-item-title>
                <v-list-item-subtitle
                  v-html="data.item.group"
                ></v-list-item-subtitle>
              </v-list-item-content>
            </template>
          </v-autocomplete>
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
      qr_id: null,
      trap: null,
      trapList: []
    }
  },
  mounted () {
    this.qr_id = this.scannedCodeValue
    this.initData()
  },
  methods: {
    submit () {
      this.nz_id = this.trap.nz_id
      this.$store
        .dispatch('submitQRMapForm', { nz_id: this.nz_id, qr_id: this.qr_id })
        .then((response) => {
          this.nz_id = null
          this.qr_id = null
          this.$store.dispatch('setSuccess', { success: response.data })
          setTimeout(() => {
            this.$router.push('/scan')
          }, 1000)
        })
        .catch((error) => {
          this.$refs.form.validate()
          this.$store.dispatch('setError', { error: error.response.data })
        })
    },
    initData () {
      const options = []
      if (this.scanAdmin) {
        // Admin here, populate with all unmapped traps
        const projects = {}
        this.noCodes.forEach((element) => {
          if (projects[element.project.name]) {
            projects[element.project.name].push(element)
          } else {
            projects[element.project.name] = [element]
          }
        })

        for (const key in projects) {
          if (Object.hasOwnProperty.call(projects, key)) {
            const element = projects[key]
            options.push({ header: 'Project: ' + key })
            element.forEach((trap) => {
              options.push({
                name: trap.name,
                group: key,
                nz_id: trap.nz_trap_id
              })
            })
          }
        }
        this.trapList = options
      } else {
        this.pcordOptions.forEach((element) => {
          if (element.traps.length > 0) {
            options.push({ header: 'Project: ' + element.name })
            element.traps.forEach((trap) => {
              options.push({
                name: trap.name,
                group: element.name,
                nz_id: trap.nz_trap_id
              })
            })
          }
        })
        this.trapList = options
      }
    }
  },
  computed: {
    ...mapGetters([
      'recentQRs',
      'scannedCodeValue',
      'pcordOptions',
      'scanAdmin',
      'noCodes'
    ])
  }
}
</script>
