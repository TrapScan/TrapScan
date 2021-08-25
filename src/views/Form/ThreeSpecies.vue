<template>
  <div class="form-options">
    <h2>The trap caught a...</h2>
    <div v-if="! moreItems" class="option-grid">
      <ChildFormGrid  v-for="option in getSpecies"
        :goesTo="5"
        :key="option"
        :icon="option.toLowerCase()"
        :name="option"
        :size="option === 'Stoat' || option === 'Rat' ? '90%' : '80%'"
        :formData="{ species_caught: option, words: `${option} ` }"
        :title="option"></ChildFormGrid>
    </div>
    <div v-else>
      <ChildForm v-for="option in getExtraSpecies"
        :goesTo="5"
        :key="option"
        :name="option"
        :formData="{ species_caught: option, words: `${option} ` }"
        :title="option"></ChildForm>
    </div>

    <!-- This button will need to be updated with any changes to ChildForm styling -->
    <div class="text-center" v-if="! moreItems">
        <v-btn class="ma-2" outlined color="primary" @click="showMoreItems">Show More Items</v-btn>
    </div>
    <div class="text-center" v-else>
        <v-btn class="ma-2" outlined color="primary" @click="showLessItems">Show Less Items</v-btn>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ChildFormGrid from './ChildFormGrid.vue'
import ChildForm from './ChildFom.vue'
export default {
  // Todo: Fix the size option for SVG rendering, we shouldn't have to scale by different amounts here
  components: {
    ChildFormGrid,
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
      this.moreItems = true
    },
    showLessItems () {
      this.moreItems = false
    }
  },
  computed: {
    ...mapGetters(['getSpecies', 'getExtraSpecies'])
  }
}
</script>

<style lang="scss" scoped>
.option-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
  column-gap: 10px;
  row-gap: 10px;
}
</style>
