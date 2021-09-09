<template>
  <div class="form-options">
    <h2>I rebaited the trap with…</h2>
    <div v-if="! moreItems" class="option-grid">
      <ChildFormGrid
        v-for="option in getBait"
        :goesTo="6"
        :key="option"
        :icon="option.toLowerCase().replace(/\s/g, '')"
        :name="option"
        size="80%"
        :formData="{ rebaited: 'Yes', bait_type: option, words: `so I rebaited it with ${option}` }"
        :title="option"
      ></ChildFormGrid>
      <ChildFormGrid
        :goesTo="6"
        key="I didn’t rebait it"
        name="I didn’t rebait it"
        icon="norebait"
        :formData="{ rebaited: 'No', bait_type: 'None', words: 'but I didn\'t rebait it' }"
        title="I didn’t rebait it"></ChildFormGrid>
    </div>
    <div v-else>
      <ChildForm  v-for="option in getExtraBait"
        :goesTo="6"
        :key="option"
        :name="option"
        :formData="{ rebaited: 'Yes', bait_type: option, words: `so I rebaited it with ${option}` }"
        :title="option"></ChildForm>
    </div>

    <!-- This button will need to be updated with any changes to ChildForm styling -->
    <div class="text-center" v-if="!moreItems">
      <v-btn class="ma-2" outlined color="primary" @click="showMoreItems"
        >Show More Items</v-btn
      >
    </div>
    <div class="text-center" v-else>
      <v-btn class="ma-2" outlined color="primary" @click="showLessItems"
        >Show Less Items</v-btn
      >
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ChildForm from './ChildFom'
import ChildFormGrid from './ChildFormGrid.vue'
export default {
  components: {
    ChildForm,
    ChildFormGrid
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
    ...mapGetters(['getBait', 'getExtraBait'])
  }
}
</script>

<style lang="scss" scoped>
</style>
