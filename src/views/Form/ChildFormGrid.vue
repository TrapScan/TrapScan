<template>
  <!-- <div class="text-center card ma-2 pa-2"> -->
  <div
    class="form-border rounded grid-button text-center card py-2 d-flex flex-column"
    @click="onComplete"
  >
    <span>
      <v-icon :size="size"> $vuetify.icons.{{ icon }} </v-icon>
    </span>
    <span class="title">{{ name }}</span>
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
      default: ''
    },
    size: {
      type: String,
      default: '80%'
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
.form-border {
  border: 1px solid var(--v-border-base) !important
}
.grid-button {
  width: 100%;
  max-width: 40vh;
  cursor: pointer;
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
