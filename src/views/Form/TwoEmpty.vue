<template>
  <div class="form-options ubuntu_face">
    <h2>It was empty and the ...</h2>
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
export default {
  components: {
    ChildForm
  },
  data () {
    return {
      options: [
        {
          title: 'Bait is still good',
          goesTo: 6,
          icon: 'BaitGood',
          formData: {
            status: 'Still set, bait OK',
            rebaited: 'No',
            bait_type: 'None',
            words: 'it was still set and the bait was good so I didn\'t rebait it.'
          }
        },
        {
          title: 'Bait was old',
          goesTo: 5,
          icon: 'BaitOld',
          formData: {
            status: 'Still set, bait bad',
            words: 'it was still set and the bait was bad, '
          }
        },
        {
          title: 'Bait was taken',
          goesTo: 5,
          icon: 'BaitMissing',
          formData: {
            status: 'Still set, bait missing',
            words: 'it was still set and the bait was missing, '
          }
        },
        {
          title: 'Trap was sprung',
          goesTo: 5,
          icon: 'Sprung',
          formData: {
            status: 'Sprung',
            species_caught: 'None',
            words: 'it was sprung, '
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
