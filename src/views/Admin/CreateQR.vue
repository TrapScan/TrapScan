<template>
  <v-container fill-height fluid style="max-height: 70vh">
    <v-row align="center" justify="center">
      <v-col lg="6">
        <v-text-field
          v-model="number"
          type="number"
          label="Number of Codes"
          append-outer-icon="mdi-plus"
          @click:append-outer="increment"
          prepend-icon="mdi-minus"
          @click:prepend="decrement"
        ></v-text-field>
       <!-- <v-select
          v-model="project"
          :items="items"
          item-text="name"
          item-value="id"
          label="Project (Optional)"
        ></v-select> -->
        <v-row align="center" justify="space-around">
          <v-btn depressed color="primary" @click="submit"> Generate Codes </v-btn>
        </v-row>

        <v-row align="center" justify="space-around" v-if="this.recentQRs.length > 0" style="overflow:scroll">
          <code>
            <p v-for="qr in this.recentQRs" :key="qr">{{ qr }}</p>
          </code>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  data: () => ({
    number: 0,
    project: null,
    items: [
      { id: 1, name: 'Test Project' },
      { id: 2, name: 'Dylan House' },
      { id: 3, name: 'Big Fooking Mountains' },
      { id: 4, name: 'Airport' }
    ]
  }),
  methods: {
    submit () {
      this.$store.dispatch('submitQRCreationForm', { number: this.number, project: this.project })
    },
    increment () {
      this.number = parseInt(this.number, 10) + 1
    },
    decrement () {
      this.number = parseInt(this.number, 10) - 1
    }
  },
  computed: {
    ...mapGetters(['recentQRs'])
  }
}
</script>
