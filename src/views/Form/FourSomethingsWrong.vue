<template>
  <div>
    <h2>Something is wrong with it…</h2>
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
import ChildForm from './ChildFom'
export default {
  components: {
    ChildForm
  },
  data () {
    return {
      options: [
        {
          title: 'Needs repair or replacing',
          goesTo: 6,
          icon: 'NeedsRepair',
          formData: {
            trap_condition: 'Needs maintenance',
            status: 'Removed for Repair',
            words: 'The trap or trap box needs repair or replacing.'
          }
        },
        {
          title: 'Trap is missing',
          goesTo: 6,
          icon: 'TrapMissing',
          formData: {
            trap_condition: 'Needs maintenance',
            status: 'Trap gone',
            words: 'The trap is missing.'
          }
        },
        {
          title: 'QR code needs fixing',
          goesTo: 6,
          icon: 'QRBroken',
          formData: {
            trap_condition: 'Needs maintenance',
            status: 'Removed for Repair',
            words: 'The QR code is wrong, missing or not working.'
          }
        }
      ]
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
</style>
