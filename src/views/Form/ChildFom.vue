<template>
  <!-- <div class="text-center card ma-2 pa-2"> -->
  <div
    class="child-button-shadow card ma-2 py-4 d-flex justify-start rounded"
    color="primary"
    @click="onComplete"
  >
    <v-row no-gutters>
      <v-col cols="3" class="d-flex justify-center align-center">
        <!-- Icon -->
        <div class="icon_background rounded-lg pa-1 ma-1">
          <v-icon class="my-auto" v-if="this.icon" x-large>$vuetify.icons.{{ icon }}</v-icon>
          <v-icon class="my-2" v-else large color="primary">mdi-chevron-right</v-icon>
        </div>
      </v-col>
      <v-col cols="7" class="mt-2" v-bind:class="[subtext ? 'mt-2' : 'mt-5']">
        <!-- Text -->
        <v-row class="ml-1">
        <span class="title">{{ name }}</span>
        </v-row>
        <v-row v-if="subtext" class="ml-1">
          <span>{{subtext}}</span>
        </v-row>
      </v-col>
      <v-col cols="2" class="d-flex justify-end">
        <!-- Trail icon -->
        <v-icon large color="primary" class="justify-self-end">mdi-chevron-right</v-icon>
      </v-col>
    </v-row>
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
    },
    subtext: {
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
