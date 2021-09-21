<template>
  <div>
    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-card-title class="text-h5"> Map Trap </v-card-title>

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

          <v-btn color="red darken-1" text @click="discard"> Discard </v-btn>

          <v-btn color="green darken-1" text @click="save"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-data-table
      :headers="headers"
      :items="noCodes"
      item-key="name"
      :search="search"
    >
      <template v-slot:item.actions="{ item }">
        <v-btn class="primary" @click="editItem(item)">Map Trap</v-btn>
      </template>
      <template v-slot:top>
        <v-text-field
          v-model="search"
          label="Search"
          class="mx-4"
        ></v-text-field>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      search: '',
      calories: '',
      dialog: false,
      editedItem: {},
      editedIndex: null,
      selectedCode: null,
      selectedIndex: null,
      error: null
    }
  },
  methods: {
    editItem (item) {
      this.dialog = true
      this.editedIndex = this.noCodes.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    save () {
      this.error = null
      const qrId = this.selectedCode.qr_code
      const nzId = this.editedItem.nz_trap_id
      console.log({ qr_id: qrId, nz_id: nzId })
      this.$store.dispatch('submitQRMapForm', { qr_id: qrId, nz_id: nzId })
        .then((res) => {
          this.selectedIndex = this.unmappedCodes.indexOf(this.selectedCode)
          this.selectedCode = null
          this.editedItem = null
          this.dialog = false
          this.$store.dispatch('removeNoCode', this.editedIndex)
          this.$store.dispatch('removeUnmappedCode', this.selectedIndex)
        })
        .catch((err) => {
          this.error = err.response.data.message
        })
    },
    discard () {
      this.error = null
      this.dialog = false
    }
  },
  mounted () {
    this.$store.dispatch('fetchNoCodes')
  },
  computed: {
    ...mapGetters(['noCodes', 'unmappedCodes']),
    headers () {
      return [
        {
          text: 'Project',
          sortable: true,
          value: 'project.name'
        },
        {
          text: 'Trap Name',
          align: 'start',
          sortable: false,
          value: 'name'
        },
        {
          text: 'NZ ID',
          sortable: true,
          value: 'nz_trap_id'
        },
        {
          text: 'Actions',
          value: 'actions'
        }
      ]
    }
  },
  watch: {
    dialog (val) {
      val || this.close()
    }
  }
}
</script>
