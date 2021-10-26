<template>
    <div>
        <v-form ref="feedbackContactForm" v-model="valid" lazy-validation>
            <v-textarea
                outlined
                required
                :rules="[v => !!v || 'Item is required']"
                name="input-7-4"
                label="Feedback or suggestions"
                v-model="form.feedback_or_suggestions"
            ></v-textarea>
            <v-textarea
                outlined
                required
                :rules="[v => !!v || 'Item is required']"
                name="input-7-4"
                label="General questions or comments"
                v-model="form.question_or_comments"
            ></v-textarea>
            <label>Rate TrapScan</label>
            <v-rating class="text-center" half-increments v-model="form.rating" :length="5" color="primary" large></v-rating>
            <v-btn :disabled="!valid" color="success" class="mr-4 mt-2" @click="submit">Submit</v-btn>
        </v-form>
    </div>
</template>

<script>
export default {
  data () {
    return {
      valid: true,
      form: {
        feedback_or_suggestions: '',
        question_or_comments: '',
        rating: null
      }
    }
  },
  methods: {
    submit () {
      const valid = this.$refs.feedbackContactForm.validate()
      if (valid) {
        this.$store.dispatch('submitFeedback', {
          type: 'bugs_or_issues',
          fields: this.form
        })
        this.$emit('submit')
        this.$refs.feedbackContactForm.reset()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
