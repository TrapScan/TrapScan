<template>
    <div>
        <v-form ref="codeContactForm" v-model="valid" lazy-validation>
            <v-text-field
                v-model="form.qr_id"
                :counter="10"
                :rules="[v => !!v || 'Item is required']"
                label="What is the QR ID?"
                messages="You can find this on the card attached to the Trap"
                required
            ></v-text-field>
            <v-text-field
                v-model="form.nz_name"
                :counter="10"
                label="What is the Trap name for TrapNZ?"
                messages="Optional. You'll find this in the TrapNZ app"
                required
            ></v-text-field>
            <v-textarea
                class="mt-3"
                outlined
                required
                :rules="[v => !!v || 'Item is required']"
                name="input-7-4"
                label="Explain the issue"
                v-model="form.body"
            ></v-textarea>
            <v-btn :disabled="!valid" color="success" class="mr-4" @click="submit">Submit</v-btn>
        </v-form>
    </div>
</template>

<script>
export default {
  data () {
    return {
      valid: true,
      form: {
        qr_id: '',
        nz_name: '',
        body: ''
      }
    }
  },
  methods: {
    submit () {
      const valid = this.$refs.codeContactForm.validate()
      if (valid) {
        this.$store.dispatch('submitFeedback', {
          type: 'bugs_or_issues',
          fields: {
            qr_id: this.form.qr_id,
            nz_name: this.form.nz_name,
            body: this.form.body
          }
        })
        this.$emit('submit')
        this.$refs.codeContactForm.reset()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
