<template>
    <div>
        <AnonInspectionForm></AnonInspectionForm>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AnonInspectionForm from './AnonForm/AnonInspectionForm.vue'
export default {
  components: {
    AnonInspectionForm
  },
  data () {
    return {
      code: this.$route.params.code
    }
  },
  mounted () {
    if (this.isUserAuth) {
      // Send to main form with the code
      console.log('Already authed!')
    } else {
      // Stay here and give them the anon form
    }
  },
  computed: {
    ...mapGetters(['getUser', 'isUserAuth'])
  }
}
</script>

<style lang="scss" scoped>

</style>
