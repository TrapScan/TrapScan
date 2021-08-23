<template>
  <div>
    <h2>The trap caught a...</h2>
    <div v-if="! moreItems">
      <ChildForm v-for="option in getSpecies"
        :goesTo="2"
        :dumb="true"
        :key="option"
        :name="option"
        :formData="{ species_caught: option, words: `${option} ` }"
        :title="option"></ChildForm>
    </div>
    <div v-else>
      <ChildForm  v-for="option in getExtraSpecies"
        :goesTo="2"
        :dumb="true"
        :key="option"
        :name="option"
        :formData="{ species_caught: option, words: `${option} ` }"
        :title="option"></ChildForm>
    </div>

    <!-- This button will need to be updated with any changes to ChildForm styling -->
    <div class="text-center">
        <v-btn class="ma-2" outlined color="primary" @click="showMoreItems">Show More Items</v-btn>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ChildForm from '../Form/ChildFom.vue'
export default {
  components: {
    ChildForm
  },
  data () {
    return {
      moreItems: false,
      items: []
    }
  },
  methods: {
    showMoreItems () {
      console.log('more')
      this.moreItems = true
    }
  },
  computed: {
    ...mapGetters(['getSpecies', 'getExtraSpecies'])
  }
}
</script>

<style lang="scss" scoped>
</style>
