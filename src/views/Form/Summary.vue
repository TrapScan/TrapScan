<template>
  <div>
    <h2>{{ this.form.words }}</h2>
    <br>
    <h3>Is this correct?</h3>
    <ChildForm v-for="option in options"
      :icon="option.icon"
      :goesTo="option.goesTo"
      :key="option.title"
      :name="option.title"
      :formData="option.formData"
      :title="option.title">
    </ChildForm>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ChildForm from './ChildFom'
export default {
  components: {
    ChildForm
  },
  data () {
    return {
      options: [
        {
          title: 'Yes, submit inspection',
          goesTo: 9,
          icon: 'Submit',
          formData: {
            // TODO: Replace with real code
            code: 'TEST_CODE',
            // date: new Date(),
            recorded_by: this.user
          }
        },
        {
          title: 'Add note first',
          goesTo: 8,
          icon: 'AddNote',
          formData: {}
        },
        {
          title: 'No, let me edit',
          goesTo: 7,
          icon: 'Edit',
          formData: {}
        }
      ]
    }
  },
  methods: {
    getToday () {
      var today = new Date()
      var dd = String(today.getDate()).padStart(2, '0')
      var mm = String(today.getMonth() + 1).padStart(2, '0') // January is 0!
      var yyyy = today.getFullYear()

      today = dd + '/' + mm + '/' + yyyy
      return today
    }
  },
  computed: {
    ...mapGetters({
      user: 'getUserEmail',
      form: 'getForm'
    })
  }
}
</script>

<style lang="scss" scoped>
</style>
