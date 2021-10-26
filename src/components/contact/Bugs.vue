<template>
    <div>
        <v-form ref="bugContactForm" v-model="valid" lazy-validation>
            <v-select
                v-model="form.issue_related_to"
                :items="possible_issues"
                :rules="[v => !!v || 'Item is required']"
                label="What is the issue related to?"
                required
            ></v-select>
            <v-textarea
                class="mt-2"
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
        issue_related_to: '',
        body: ''
      },
      possible_issues: [
        'Scan QR',
        'Nearby Traps',
        'Data',
        'About Page',
        'Settings Page',
        'Usability or accessibility'
      ]
    }
  },
  methods: {
    submit () {
      const valid = this.$refs.bugContactForm.validate()
      if (valid) {
        this.$store.dispatch('submitFeedback', {
          type: 'bugs_or_issues',
          fields: this.form
        })
        this.$emit('submit')
        this.$refs.bugContactForm.reset()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
