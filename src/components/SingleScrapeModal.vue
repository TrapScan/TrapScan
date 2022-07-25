<template>
  <div>
    <v-alert
      v-if="error"
      border="left"
      colored-border
      color="red accent-4"
      elevation="2"
    >
      {{ error }}
    </v-alert>
    <v-alert
      v-if="success"
      border="left"
      colored-border
      color="green accent-4"
      elevation="2"
    >
      {{ success }}
    </v-alert>
    <v-text-field label="NZ Node ID" v-model="nz_id" required></v-text-field>
    <v-btn @click="scrape" class="mb-4" block :loading="loading">
      Fetch Trap
    </v-btn>
  </div>
</template>

<script>
import admin from '../api/admin'
export default {
  name: 'SingleScrapeModal',
  data () {
    return {
      nz_id: null,
      error: null,
      loading: false,
      success: null
    }
  },
  methods: {
    scrape () {
      this.loading = true
      this.error = null
      this.success = null
      admin
        .scrapeSingleTrap(this.nz_id)
        .then(data => {
          console.log(data)
          this.loading = false
          this.nz_id = null
          this.success = `Trap ${data.data.name} was added with ID: ${data.data.id}`
        })
        .catch(err => {
          this.error = err.response.data.message
          console.log(err)
          this.loading = false
        })
    }
  }
}
</script>
