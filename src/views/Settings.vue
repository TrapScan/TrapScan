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
            @change="projectSelected"
            v-model="selectedProject"
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

        <v-divider></v-divider>

        <v-list-item>
          <v-list-item-content
            ><v-list-item-title class="font-weight-bold"
              >Catches</v-list-item-title
            >
          </v-list-item-content>
          <v-list-item-action
            ><v-switch
              @click="notifyCatchesChange"
              v-model="selectedProject.notify_catches"
            />
          </v-list-item-action>
        </v-list-item>

        <v-list-item v-if="selectedProject.notify_catches">
          <v-list-item-content
            ><v-list-item-title class="font-weight-bold"
              >Enable Species Filter</v-list-item-title
            >
          </v-list-item-content>
          <v-list-item-action
            ><v-switch @click="toggleSpeciesFilter" v-model="showFilter" />
          </v-list-item-action>
        </v-list-item>
        <v-list-item v-if="showFilter && selectedProject.notify_catches">
          <v-list-item-content>
            <v-select
              class="pb-0"
              hint="Only be notified for certain catches"
              v-model="selectedProject.catch_filter"
              @change="updateCatchFilter"
              :items="allSpecies"
              :menu-props="{ maxHeight: '400' }"
              return-object
              persistent-hint
              multiple
              chips
              label="Species Filter"
              outlined
            ></v-select>
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
      selected: 'All',
      selectedProject: null,
      catchFilter: null,
      showFilter: false
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
    projectSelected () {
      this.showFilter = this.selectedProject.catch_filter.length > 0
    },
    updateCatchFilter () {
      if (this.showFilter && this.selectedProject.notify_catches) {
        if (this.selectedProject.catch_filter.length === 0) {
          // Empty catch filter, set it to null and push to backend
          this.selectedProject.catch_filter = null
          this.showFilter = false
        }
        this.$store.dispatch('updateCatchFilter', {
          catchFilter: this.selectedProject.catch_filter,
          projectId: this.selectedProject.id
        })
      }
    },
    notifyCatchesChange () {
      const setting = {
        project_id: this.selectedProject.id,
        value: this.selectedProject.notify_catches,
        key: 'notify_catches'
      }
      return this.$store.dispatch('updateCoordinatorSettings', setting)
    },
    // This is needed to catch them disabling the filter without unselecting
    toggleSpeciesFilter () {
      if (!this.showFilter) {
        this.selectedProject.catch_filter = null
      }
      this.$store.dispatch('updateCatchFilter', {
        catchFilter: this.selectedProject.catch_filter,
        projectId: this.selectedProject.id
      })
    }
  },
  computed: {
    ...mapGetters([
      'getUser',
      'themeNames',
      'currentTheme',
      'coordinatorSettings',
      'allSpecies'
    ]),
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
