<template>
  <div class="form-options">
    <h2>The trap caught a...</h2>
    <div v-if="!moreItems" class="option-grid">
      <ChildFormGrid
        v-for="option in getSpecies"
        :goesTo="5"
        :key="option"
        :icon="option.toLowerCase()"
        :name="option"
        size="95%"
        :formData="{ species_caught: option, words: `${option} ` }"
        :title="option"
      ></ChildFormGrid>

      <div
        id="child-form-extra"
        class="card form-border grid-button text-center py-2 d-flex flex-column"
         @click="showMoreItems"
      >
        <span>
          <v-icon size="95%"> $vuetify.icons.somethingElse </v-icon>
        </span>
        <span class="title">Something else</span>
      </div>
    </div>
    <div v-else>
      <ChildForm
        v-for="option in getExtraSpecies"
        :goesTo="5"
        :key="option"
        :name="option"
        :formData="{ species_caught: option, words: `${option}, ` }"
        :title="option"
      ></ChildForm>
    </div>

    <div class="text-center" v-if="moreItems">
      <v-btn class="ma-2" outlined color="primary" @click="showLessItems"
        >Show Less Items</v-btn
      >
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

<style lang="scss">
#child-form-extra {
  border: 1px solid var(--v-border-base) !important

}
.option-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
  column-gap: 10px;
  row-gap: 10px;
}

.child-button-shadow {
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
}
</style>
