<template>
  <div>
    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-card-title class="text-h5"> Install Trap </v-card-title>

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
    <v-data-table :headers="headers" :items="allTraps" item-key="name" :search="search">
      <template v-slot:item.actions="{ item }">
        <a
          class="primary v-btn v-btn--is-elevated v-btn--has-bg v-size--default"
          @click="print($event, item)"
        >Print Trap</a>
        <a
          class="ml-2 primary v-btn v-btn--is-elevated v-btn--has-bg v-size--default"
          @click="editItem(item)"
        >Remap Trap</a>
      </template>
      <template v-slot:top>
        <v-text-field v-model="search" label="Search" class="mx-4"></v-text-field>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import admin from '../../api/admin'
import axios from 'axios'
export default {
  data () {
    return {
      search: '',
      calories: '',
      dialog: false,
      editedItem: {},
      selectedCode: null,
      error: null
    }
  },
  methods: {
    editItem (item) {
      this.dialog = true
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
          // Update the front end without refresh
          // for (let i = 0; i < this.allTraps.length; i++) {
          //   const element = this.allTraps[i]
          //   if (element.id === this.editedItem.id) {
          //     element.qr_id = qrId
          //     this.allTraps.splice(i, element, 1)
          //     break
          //   }
          // }
          this.$store.dispatch('fetchTraps')
          this.selectedIndex = this.unmappedCodes.indexOf(this.selectedCode)
          this.selectedCode = null
          this.editedItem = null
          this.dialog = false
          // console.log(this.allTraps.indexOf(this.editedItem))
          this.$store.dispatch('removeUnmappedCode', this.selectedIndex)
        })
        .catch((err) => {
          console.log(err)
          this.error = err.response.data.message
        })
    },
    discard () {
      this.error = null
      this.dialog = false
    },
    print (event, item) {
      // admin.print(item.qr_id).then((qr) => {
      //   const blob = new Blob([qr.data], {
      //     type: 'image/png'
      //   })
      //   const url = window.URL.createObjectURL(blob)
      //   const link = document.createElement('a')
      //   link.style = 'display: none'
      //   link.target = '_blank'
      //   link.download = item.qr_id + '.png'
      //   link.href = url
      //   // const body = document.querySelector('body')
      //   document.body.appendChild(link)
      //   link.click()
      // })
      axios({
        url: process.env.VUE_APP_API_URL + '/api/admin/qr/print/' + item.qr_id,
        method: 'GET',
        responseType: 'blob' // important
      }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', 'image.png')
        document.body.appendChild(link)
        link.click()
      })
    }
  },
  mounted () {
    this.$store.dispatch('fetchTraps')
  },
  computed: {
    ...mapGetters(['allTraps', 'unmappedCodes']),
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
          text: 'QR',
          value: 'qr_id'
        },
        {
          text: 'Actions',
          value: 'actions'
        }
      ]
    }
  }
  // watch: {
  //   dialog (val) {
  //     val || this.close()
  //   }
  // }
}
</script>
