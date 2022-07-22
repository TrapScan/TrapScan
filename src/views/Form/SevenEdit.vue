<template>
  <div>
    <h2>Edit inspection</h2>
    <hr role="separator" aria-orientation="horizontal" class="mt-2 mx-4 v-divider theme--light">

    <div class="text-left mt-3" v-if="itemData">
        <p class="font-weight-black mb-2">
          QR ID
        </p>
      <v-text-field
        class="rounded-lg"
        background-color="rgb(231,234,236,236)"
        dense
        filled
        solo
        v-model="form_data.QR_ID"
      ></v-text-field>
        <p class="font-weight-black mb-2">
          Inspection date
        </p>
      <div class="row">
        <div class="col-6">
          <v-menu
            v-model="modal_date"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="form_data.date"
                dense
                filled
                class="rounded-lg"
                solo
                background-color="rgb(231,234,236,236)"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="form_data.date"
              @input="modal_date = false"
            ></v-date-picker>
          </v-menu>
        </div>
        <div class="col-6">
          <v-dialog
            ref="dialog"
            v-model="modal_time"
            :return-value.sync="form_data.time"
            persistent
            width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="form_data.time"
                dense
                filled
                class="rounded-lg"
                solo
                background-color="rgb(231,234,236,236)"
                prepend-icon="mdi-clock-time-four-outline"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-time-picker
              v-if="modal_time"
              v-model="form_data.time"
              full-width
            >
              <v-spacer></v-spacer>
              <v-btn
                text
                color="primary"
                @click="modal_time = false"
              >
                Cancel
              </v-btn>
              <v-btn
                text
                color="primary"
                @click="$refs.dialog.save(form_data.time)"
              >
                OK
              </v-btn>
            </v-time-picker>
          </v-dialog>
        </div>
      </div>

        <p class="font-weight-black mb-2">
          Status
        </p>
        <v-autocomplete
          dense
          filled
          background-color="rgb(231,234,236,236)"
          class="rounded-lg"
          solo
          :value="form_data.status"
          :items="status"
        ></v-autocomplete>
        <p class="font-weight-black mb-2">
          Species caught
        </p>
        <v-autocomplete
          dense
          filled
          class="rounded-lg"
          solo
          background-color="rgb(231,234,236,236)"
          :items="allSpecies"
          v-model="form_data.species_caught"
        ></v-autocomplete>
        <p class="font-weight-black mb-2">
          Rebaited
        </p>
        <v-autocomplete
          dense
          filled
          class="rounded-lg"
          solo
          background-color="rgb(231,234,236,236)"
          :items="['Yes','No']"
          :value="form_data.rebaited"
        ></v-autocomplete>
        <p class="font-weight-black mb-2">
          Bait type
        </p>
        <v-autocomplete
          dense
          filled
          class="rounded-lg"
          solo
          :items="allBaits"
          :value="form_data.bait_type"
          background-color="rgb(231,234,236,236)"
        ></v-autocomplete>
        <p class="font-weight-black mb-2">
          Trap Condition
        </p>
        <v-autocomplete
          dense
          filled
          class="rounded-lg"
          solo
          :items="trap_condition"
          :value="form_data.trap_condition"
          background-color="rgb(231,234,236,236)"
        ></v-autocomplete>
        <p class="font-weight-black mb-2">
          Note
        </p>
        <v-textarea
          solo
          class="rounded-lg"
          name="input-7-4"
          label="Note"
          v-model="form_data.notes"
          background-color="rgb(231,234,236,236)"
        ></v-textarea>
      <div class='button -blue center w-100' @click="save">SUBMIT</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    formData: {
      type: Object
    }
  },
  data () {
    return {
      modal_date: false,
      modal_time: false,
      status: [
        'Sprung',
        'Removed for Repair',
        'Trap Replaced',
        'Still set, bait OK',
        'Still set, bait missing',
        'Still set, bait bad',
        'Trap gone',
        'Trap interfered by stock'
      ],
      trap_condition: [
        'Ok',
        'Needs maintenance',
        'Repaired',
        'Regassed',
        'Relured',
        'Battery charge'
      ],
      form_data: {
        QR_ID: null,
        code: null,
        date: null,
        time: null,
        species_caught: 'Nope',
        status: 'Sprung',
        rebaited: null,
        bait_type: null,
        trap_condition: null,
        notes: null
      }
    }
  },
  methods: {
    save () {
      this.$store.dispatch('updateForm', { form: this.form_data })
      this.$store.dispatch('setFormIndex', { index: 6 })
    },
    setData () {
      this.form_data.QR_ID = this.scannedCodeValue
      this.form_data.bait_type = this.getForm.bait_type
      this.form_data.code = this.getForm.code
      this.form_data.notes = this.getForm.notes
      this.form_data.rebaited = this.getForm.rebaited
      this.form_data.species_caught = this.getForm.species_caught
      this.form_data.status = this.getForm.status
      this.form_data.trap_condition = this.getForm.trap_condition
    }
  },
  mounted () {
    const today = new Date()
    this.form_data.date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
    this.form_data.time = today.getHours() + ':' + today.getMinutes()
    this.setData()
  },
  watch: {
    itemData (n, o) {
      this.setData()
    }
  },
  computed: {
    ...mapGetters(['allBaits', 'allSpecies', 'getForm', 'getFormIndex', 'scannedCodeValue']),
    itemData () {
      if (this.getFormIndex === 7) {
        return true
      }
      return false
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
