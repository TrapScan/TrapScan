<template>
  <div>
    <v-data-table :headers="headers" :items="allTraps" item-key="name" :search="search">
      <template v-slot:item.actions="{ item }">
        <a
          class="primary v-btn v-btn--is-elevated v-btn--has-bg v-size--default"
          @click="print($event, item)"
        >Print Trap</a>
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
      editedItem: {}
    }
  },
  methods: {
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
    ...mapGetters(['allTraps']),
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
  },
  watch: {
    dialog (val) {
      val || this.close()
    }
  }
}
</script>
