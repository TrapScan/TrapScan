<template>
  <div>
    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-card-title class="text-h5"> Map Code </v-card-title>

        <v-card-text>
          <v-autocomplete
            v-model="selectedTrap"
            :items="noCodes"
            return-object
            background-color="primary"
            label="Trap"
            placeholder="Type to search for a Trap"
            item-text="name"
            item-value="nz_trap_id"
            :error="error !== null"
            :error-messages="error"
            autofocus
            clearable
            filled
            solo
          >
            <template v-slot:item="data">
              <v-list-item-content>
                <v-col>
                  <div v-text="data.item.name"></div>
                  <div v-text="data.item.project.name"></div>
                  <div v-text="data.item.nz_trap_id"></div>
                </v-col>
              </v-list-item-content>
            </template>
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
      :items="unmappedCodes"
      item-key="name"
      :search="search"
    >
      <template v-slot:item.actions="{ item }">
        <v-btn class="primary" @click.stop="editItem(item)">Map Code</v-btn>
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
      selectedTrap: null,
      selectedIndex: null,
      error: null
    }
  },
  methods: {
    editItem (item) {
      this.dialog = true
      this.editedIndex = this.unmappedCodes.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    save () {
      this.error = null
      const qrId = this.editedItem.qr_code
      const nzId = this.selectedTrap.nz_trap_id
      console.log({ qr_id: qrId, nz_id: nzId })
      this.$store.dispatch('submitQRMapForm', { qr_id: qrId, nz_id: nzId })
        .then((res) => {
          this.selectedIndex = this.noCodes.indexOf(this.selectedTrap)
          this.selectedTrap = null
          this.editedItem = null
          this.dialog = false
          this.$store.dispatch('removeNoCode', this.selectedIndex)
          this.$store.dispatch('removeUnmappedCode', this.editedIndex)
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
    this.$store.dispatch('fetchUnmappedCodes')
  },
  computed: {
    ...mapGetters(['unmappedCodes', 'noCodes']),
    headers () {
      return [
        {
          text: 'ID',
          sortable: true,
          value: 'id'
        },
        {
          text: 'QR Code',
          sortable: true,
          value: 'qr_code'
        },
        {
          text: 'Created At',
          sortable: true,
          value: 'created_at'
        },
        {
          text: 'Actions',
          align: 'center',
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
