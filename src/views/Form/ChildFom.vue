<template>
  <!-- <div class="text-center card ma-2 pa-2"> -->
  <div
    class="child-button-shadow text-center card ma-2 py-5 d-flex justify-start align-center rounded"
    color="primary"
    @click="onComplete"
  >
    <span class="ml-3 mr-4 icon_background  rounded-lg">
      <v-icon v-if="this.icon" x-large>$vuetify.icons.{{ icon }}</v-icon>
      <v-icon v-else large color="primary">mdi-chevron-right</v-icon>
    </span>
    <span class="mr-auto subtitle align-self-start text-left">{{ name }}</span>
    <v-icon large color="primary" class="justify-self-end"> mdi-chevron-right </v-icon>
  </div>
  <!-- </div> -->
</template>
<script>
export default {
  props: {
    name: {
      type: String
    },
    goesTo: {
      type: Number
    },
    formData: {
      type: Object
    },
    title: {
      type: String
    },
    dumb: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: null
    }
  },
  data () {
    return {}
  },
  methods: {
    onComplete () {
      if (!this.dumb) {
        this.$store.dispatch('updateForm', { form: this.formData })
        this.$store.dispatch('setFormIndex', { index: this.goesTo })
      } else {
        this.$store.dispatch('anonUpdateForm', { form: this.formData })
        this.$store.dispatch('anonSetFormIndex', { index: this.goesTo })
      }
    }
  }
}
</script>
<style scoped>
button {
  width: 100%;
  max-width: 80vh;
}

.justify-self-start {
  justify-self: start !important;
}

.justify-self-end {
  justify-self: end !important;
}
.child-button-shadow {
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
}
</style>
