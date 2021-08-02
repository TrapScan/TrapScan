<template>
  <div>
    <h1>Settings</h1>
    <v-list-item>
      <v-list-item-content
        ><v-list-item-title class="font-weight-bold">
          Dark Mode</v-list-item-title
        >
      </v-list-item-content>
      <v-list-item-action
        ><v-switch v-model="dark_mode" />
      </v-list-item-action>
    </v-list-item>

    <v-list-item>
      <v-list-item-content>
        <v-select v-model="selected" @change="changedTheme" :items="themeNames" item-text="name" item-value="key" label="Selected Theme" outlined></v-select>
      </v-list-item-content>
    </v-list-item>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Settings',
  data () {
    return {
      selected: null
    }
  },
  mounted () {
    this.selected = this.currentTheme
  },
  methods: {
    changedTheme (value) {
      if (this.currentTheme !== value) {
        this.$store.dispatch('setTheme', value)
      }
    }
  },
  computed: {
    ...mapGetters(['getUser', 'themeNames', 'currentTheme']),
    dark_mode: {
      get () {
        return this.$store.state.settings.settings.dark_mode
      },
      set (value) {
        return this.$store.dispatch('setDarkMode', value)
      }
    }
  }
}
</script>
