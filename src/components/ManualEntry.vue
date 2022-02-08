<template>
  <v-dialog @click:outside="discard" v-model="showDialog" max-width="500">
    <v-card>
      <v-card-title class="text-h5">{{ title }}</v-card-title>
      <v-card-text class="pb-0">
        <p class="mb-1">The QR ID is located in the top left of the QR Card</p>
        <v-text-field
          v-model="enteredCode"
          large
          solo
          outlined
          clearable
        ></v-text-field>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn color="red darken-1" text @click="discard">Cancel</v-btn>

        <v-btn color="green darken-1" text @click="save">Check Code</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    title: {
      tyep: String,
      defualt: 'Install Trap'
    }
  },
  data () {
    return {
      enteredCode: null,
      error: null
    }
  },
  methods: {
    save () {
      this.error = null
      this.$emit('save', this.enteredCode)
      this.$emit('close')
    },
    discard () {
      this.error = null
      this.$emit('close')
    }
  },
  beforeDestroy () {
    this.$emit('close')
  }
}
</script>

<style lang="scss" scoped>
</style>
