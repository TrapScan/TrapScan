<template>
  <div class="form-options">
    <h2>I checked this trap {{ scannedCodeValue }} and...</h2>
    <div class="d-flex flex-column justify-end" style="height: 90%">
      <ChildForm v-for="option in options"
        :icon="option.icon"
        :goesTo="option.goesTo"
        :key="option.title"
        :name="option.title"
        :formData="option.formData"
        :title="option.title">
      </ChildForm>
    </div>
  </div>
</template>

<script>
import ChildForm from './ChildFom'
import { mapGetters } from 'vuex'
export default {
  components: {
    ChildForm
  },
  data () {
    return {
      options: [
        {
          title: 'It was empty',
          goesTo: 2,
          icon: 'TrapMissing',
          formData: {
            strikes: 0,
            species_caught: 'None',
            trap_condition: 'Ok',
            words: 'The trap caught nothing, '
          }
        },
        {
          title: 'Something was in it',
          goesTo: 3,
          icon: 'SomethingIsInit',
          formData: {
            strikes: 0,
            status: 'Sprung',
            trap_condition: 'Ok',
            words: 'The trap caught a '
          }
        },
        {
          title: 'Somethings wrong',
          goesTo: 4,
          icon: 'SomethingIsWrong',
          formData: {
            strikes: 0,
            species_caught: 'None',
            rebaited: 'No',
            bait_type: 'None'
          }
        }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'scannedCodeValue'
    ])
  }
}
</script>

<style lang="scss" scoped>
</style>
