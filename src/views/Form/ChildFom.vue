<template>
    <div class="text-center">
        <v-btn class="ma-2" outlined color="primary" @click="onComplete">{{name}}</v-btn>
    </div>
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
    }
  },
  data () {
    return {
    }
  },
  methods: {
    onComplete () {
      this.$store.dispatch('updateForm', { form: this.formData })
      this.$store.dispatch('setFormIndex', { index: this.goesTo })
    }
  }
}
</script>
