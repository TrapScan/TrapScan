<template>
    <div>
        <h1 class="text-center">Contact TrapScan</h1>
        <v-expansion-panels :value="panel">
            <v-expansion-panel class="py-2 my-2">
                <v-expansion-panel-header>
                    <h4>Bugs or issues with the app</h4>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                    <Bugs v-on:submit="showDialog"></Bugs>
                </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel class="py-2 my-2">
                <v-expansion-panel-header>
                    <h4>QR code or Trap isssues</h4>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                    <Code v-on:submit="showDialog"></Code>
                </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel class="py-2 my-2">
                <v-expansion-panel-header>
                    <h4>Feedback, suggestions or contact us</h4>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                    <Feedback v-on:submit="showDialog"></Feedback>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>
        <v-dialog v-model="dialog" width="500">
            <v-card>
                <v-card-title>Feedback Submitted</v-card-title>

                <v-card-text class="mt-3">Thanks for the feedback, it helps make TrapScan a better application</v-card-text>
                <v-card-text>If your feedback requires a response, expect one within a few days</v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="error" text @click="dialog = false">Stay Here</v-btn>
                    <v-btn color="success" text @click="closeDialog">Back to Homepage</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import Bugs from '../components/contact/Bugs.vue'
import Code from '../components/contact/Code.vue'
import Feedback from '../components/contact/Feedback.vue'
export default {
  components: {
    Bugs,
    Code,
    Feedback
  },
  data () {
    return {
      panel: 0,
      dialog: false
    }
  },
  methods: {
    showDialog () {
      this.dialog = true
    },
    closeDialog () {
      this.dialog = false
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
