<template>
  <div class="form-options">
    <ChildForm
      class="mx-0"
      :goesTo="6"
      icon="BaitGood"
      name="Bait is still good"
      :formData="{ rebaited: 'No', words: `and the bait was still good so I didn't rebait it.` }"
      title="Bait is still good"
    ></ChildForm>
    <ChildForm
      class="mx-0"
      :goesTo="6"
      icon="LetUsKnow"
      name="Just letting you know"
      subtext="that the trap caught something and/or it needs rebaiting."
      :formData="{ rebaited: 'No', bait_type: 'None', words: 'and I\'m just letting you know.', upload_to_nz: false }"
      title="Just letting you know"
    ></ChildForm>
    <h2>I rebaited the trap with…</h2>
    <div v-if="!moreItems" class="option-grid">
      <ChildFormGrid
        v-for="option in getBait"
        :goesTo="6"
        :key="option"
        :icon="option.toLowerCase().replace(/\s/g, '')"
        :name="option"
        size="90%"
        :formData="{ rebaited: 'Yes', bait_type: option, words: `so I rebaited it with ${option}` }"
        :title="option"
      ></ChildFormGrid>
      <!-- <ChildFormGrid
        :goesTo="6"
        key="Show More"
        name="I didn’t rebait it"
        icon="norebait"
        :formData="{ rebaited: 'No', bait_type: 'None', words: 'but I didn\'t rebait it' }"
        title="I didn’t rebait it"
      ></ChildFormGrid> -->
      <div
        class="form-border rounded grid-button text-center card py-2 d-flex flex-column"
         @click="showMoreItems"
      >
        <span>
          <v-icon size="90%"> $vuetify.icons.somethingElseAlt </v-icon>
        </span>
        <span class="title">Show more options</span>
      </div>
    </div>
    <div v-else>
      <ChildForm
        v-for="option in getExtraBait"
        :goesTo="6"
        :key="option"
        :name="option"
        :formData="{ rebaited: 'Yes', bait_type: option, words: `so I rebaited it with ${option}` }"
        :title="option"
      ></ChildForm>
    </div>

    <div class="text-center" v-if="moreItems">
      <v-btn class="ma-2" outlined color="primary" @click="showLessItems">Show Less Items</v-btn>
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
.form-border {
  border: 1px solid var(--v-border-base) !important
}
</style>
