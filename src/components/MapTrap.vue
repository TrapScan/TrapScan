<template>
    <v-dialog @click:outside="discard" v-model="showDialog" max-width="500">
      <v-card>
        <v-card-title class="text-h5"> {{ title }} </v-card-title>
        <v-card-text>
          <v-autocomplete
            v-model="selectedCode"
            :items="unmappedCodes"
            return-object
            outlined
            label="Code"
            placeholder="Type to search for a Code"
            item-text="qr_code"
            item-value="qr_code"
            :error="error !== null"
            :error-messages="error"
            autofocus
            clearable
            filled
            solo
          >
          </v-autocomplete>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="red darken-1" text @click="discard"> Cancel </v-btn>

          <v-btn color="green darken-1" text @click="save"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    nz_id: {
      type: Number,
      default: null
    },
    title: {
      tyep: String,
      defualt: 'Install Trap'
    }
  },
  data () {
    return {
      selectedCode: null,
      error: null
    }
  },
  methods: {
    save () {
      this.error = null
      const qrId = this.selectedCode.qr_code
      const nzId = this.nz_id
      this.$store.dispatch('submitQRMapForm', { qr_id: qrId, nz_id: nzId }) // API call to remap
        .then((res) => {
          this.$store.dispatch('removeUnmappedCodeByCode', this.selectedCode.qr_code) // Remove unmapped code from local store
          this.$store.dispatch('updateLocalNearby', { qr_id: qrId, nz_id: nzId })
          this.$emit('close', qrId)
          this.selectedCode = null
          setTimeout(() => {
            this.$router.push('/dashboard') // Push them back to dashboard
          }, 500)
        })
        .catch((err) => {
          console.log(err)
          this.error = err.response.data.message
        })
    },
    discard () {
      this.error = null
      this.$emit('close')
    }
  },
  computed: {
    ...mapGetters(['noCodes', 'unmappedCodes'])
  },
  beforeDestroy () {
    this.$emit('close')
  }
}
</script>

<style lang="scss" scoped>

</style>
