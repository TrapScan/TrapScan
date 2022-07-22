<template>
  <div>
    <h2>Add a note to this inspection:</h2>
    <v-textarea
      outlined
      label="Inspection Notes"
      v-model="notes"
    ></v-textarea>
    <ChildForm
      :goesTo="9"
      key="submit"
      name="Submit Inspection"
      :formData="{
        notes: notes,
        code: 'TEST_CODE',
        recorded_by: user.id
      }"
      title="Submit Inspection">
    </ChildForm>
    <ChildForm
      :goesTo="7"
      key="edit"
      name="Edit Inspection"
      :formData="{}"
      title="Edit Inspection">
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
      notes: null,
      options: [
        {
          title: 'Submit inspection',
          goesTo: 9,
          formData: {
            // TODO: Replace with real code
            notes: this.notes,
            code: 'TEST_CODE',
            // date: new Date(),
            recorded_by: this.user
          }
        },
        {
          title: 'Edit Inspection',
          goesTo: 8,
          formData: {}
        }
      ]
    }
  },
  computed: {
    getToday () {
      var today = new Date()
      var dd = String(today.getDate()).padStart(2, '0')
      var mm = String(today.getMonth() + 1).padStart(2, '0') // January is 0!
      var yyyy = today.getFullYear()

      today = dd + '/' + mm + '/' + yyyy
      return today
    },
    ...mapGetters({
      user: 'getUserEmail',
      form: 'getForm'
    })
  }
}
</script>

<style lang="scss" scoped>
</style>
