<template>
  <div class="form-options">
    <h2>Take a look inside the trap.</h2>
    <h2>The trap caught a...</h2>
    <div v-if="! moreItems"  class="option-grid">
      <ChildFormGrid v-for="option in getSpecies"
        :goesTo="3"
        :dumb="true"
        :key="option"
        :icon="option.toLowerCase()"
        size="95%"
        :name="option"
        :formData="{ species_caught: option, words: `${option} ` }"
        :title="option"></ChildFormGrid>
      <div
        id="child-form-extra"
        class="form-border rounded grid-button text-center card py-2 d-flex flex-column"
         @click="showMoreItems"
      >
        <span>
          <v-icon size="95%"> $vuetify.icons.somethingElse </v-icon>
        </span>
        <span class="title ">Something Else</span>
      </div>
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
    <div class="text-center" v-if="moreItems">
        <v-btn class="ma-2" outlined color="primary" @click="showLessItems">Show Less Items</v-btn>
    </div>
    <div class="text-center" v-else>
        <v-btn class="ma-2" outlined color="primary" @click="showMoreItems">Show More Items</v-btn>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ChildForm from '../Form/ChildFom.vue'
import ChildFormGrid from '../Form/ChildFormGrid.vue'
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
    ...mapGetters(['getSpecies', 'getExtraSpecies'])
  }
}
</script>

<style lang="scss" scoped>
#child-form-extra {
  border: 1px solid var(--v-border-base) !important
}
.grid-button{
  cursor: pointer;
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
