<template>
  <div>
    <h2>Settings</h2>
    <v-divider></v-divider>
    <v-list-item>
      <v-list-item-content
        ><v-list-item-title class="font-weight-bold">
          Dark Mode</v-list-item-title
        >
      </v-list-item-content>
      <v-list-item-action><v-switch v-model="dark_mode" /> </v-list-item-action>
    </v-list-item>

    <v-divider></v-divider>

    <v-list-item>
      <v-list-item-content>
        <v-select
          class="pb-0"
          messages="Change the look of the application"
          v-model="selected"
          @change="changedTheme"
          :items="themeNames"
          item-text="name"
          item-value="key"
          label="Selected Theme"
          outlined
        ></v-select>
      </v-list-item-content>
    </v-list-item>

    <div v-if="coordinatorSettings">
      <h2>Project Coordinator Settings</h2>
      <v-divider></v-divider>
      <v-list-item>
        <v-list-item-content>
          <v-select
            class="pb-0"
            messages="Select a project to manage"
            v-model="selectedProject"
            @change="changedTheme"
            :items="coordinatorSettings"
            item-text="name"
            return-object
            item-value="key"
            label="Select a Project"
            outlined
          ></v-select>
        </v-list-item-content>
      </v-list-item>
      <div v-if="selectedProject">
        <h3>Notification Settings</h3>
        <v-list-item v-for="setting in selectedProject.settings" :key="setting.key">
          <v-list-item-content>
            <v-list-item>
              <v-list-item-content
                ><v-list-item-title class="font-weight-bold">
                  {{setting.label}}</v-list-item-title
                >
              </v-list-item-content>
              <v-list-item-action
                ><v-switch @click="toggle(setting)" v-model="setting.value" />
              </v-list-item-action>
            </v-list-item>
          </v-list-item-content>
        </v-list-item>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Settings',
  data () {
    return {
      selected: null,
      selectedProject: null
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
    },
    toggle (setting) {
      setting.project_id = this.selectedProject.id
      console.log(setting)
      this.$store.dispatch('updateCoordinatorSettings', setting)
    }
  },
  computed: {
    ...mapGetters(['getUser', 'themeNames', 'currentTheme', 'coordinatorSettings']),
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
