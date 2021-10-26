<template>
    <div>
        <v-row class="mt-6">
            <v-col>
                <v-alert>
                    <h3 class="text-h5">Import Data from TrapNZ</h3>
                    <div class="mt-3">
                        The CSV is from
                        <a class="card"
                            href="https://trap.nz/report/traps-overview"
                        >https://trap.nz/report/traps-overview</a>
                        <br />Down the very bottom of this page there is a small green "Download CSV" button
                        <br />You can leave all the default options as this will export all projects.
                        <br />This upload will fill in TrapLine data. Any traplines it does not recognise it will create
                        It will then add any traps in the csv to that Trapline.
                        <br />It will also fill in any notes for traps in the csv
                        <br />
                        <br />
                        <b>No other data is modified. No Traps are created</b>
                    </div>
                </v-alert>
                <v-file-input accept="text/csv" v-model="file" label="Supplemental Trap CSV File"></v-file-input>
                <v-btn :loading="loading" :disabled="loading" @click="uploadFile" color="primary">Upload Data</v-btn>

            </v-col>
            <v-col class>
                <v-alert>
                    <h3 class="text-h5">Scrape Trap Data</h3>
                    <div class="mt-3">
                        This is a dangerous button.
                        <br>
                        <br>
                        This will trigger a scrape of TrapNZ data for all projects we have access to.
                        <br>
                        It will create any Traps it does not recognise
                        <br>
                        It will not update data for any Traps it does not recognise
                        <br>
                        Trapline and note data are missing, the CSV has this data for all traps
                        <br>
                        <br>
                        <b>No data is modified. Traps are created</b>
                    </div>
                </v-alert>
                <v-btn :loading="loading" :disabled="loading" @click="scrapeData" x-small color="error">Scape TrapNZ Data</v-btn>
            </v-col>
        </v-row>
    </div>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      file: null
    }
  },
  methods: {
    uploadFile () {
      if (this.file) {
        this.loading = true
        this.$store.dispatch('submitCSV', this.file).then((data) => {
          console.log(data)
          this.loading = false
        })
          .catch((err) => {
            console.err(err)
            this.loading = false
          })
      }
    },
    scrapeData () {
      this.loading = true
      this.$store.dispatch('scrapeData').then((data) => {
        console.log(data)
        this.loading = false
      })
        .catch((err) => {
          this.loading = false
          console.log(err)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
