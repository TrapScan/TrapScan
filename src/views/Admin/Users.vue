<template>
  <v-form ref="form">
    <h1>Users</h1>
    <!-- Main Table -->
    <v-data-table :headers="headers" :items="allUsers" item-key="id" :search="search">
      <template v-slot:item.actions="{ item }">
        <!-- Project Modal -->
        <v-dialog width="80%">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark v-bind="attrs" v-on="on">Edit Projects</v-btn>
          </template>
          <v-card>
            <v-card-title class="text-h5">Edit {{ item.name }}</v-card-title>
            <v-card-text>
            <v-alert
              v-if="userEditError"
              color="red"
              type="error"
            >
            Something went wrong updating the user.
            </v-alert>
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">Project</th>
                      <th class="text-left">Coordinator</th>
                      <th class="text-left">Notify Catches</th>
                      <th class="text-left">Notify Inspections</th>
                      <th class="text-left">Notify Problems</th>
                      <th class="text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="project in item.projects_all" :key="project.id">
                      <td>{{ project.name }}</td>
                      <td>
                        <v-switch
                        v-model="project.pivot.coordinator"
                        @change="coordinatorSwitch(item.id, project.id, project.pivot.coordinator)"
                      ></v-switch>
                      </td>
                      <td>{{ project.pivot.notify_catches }}</td>
                      <td>{{ project.pivot.notify_inspections }}</td>
                      <td>{{ project.pivot.notify_problems }}</td>
                      <td>
                        <v-btn
                          color="red"
                          @click="removeUserFromProject(item.id, project.id)"
                        >Delete</v-btn>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <!-- Add Project Modal -->
              <v-dialog width="50%">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    @click="() => currentProjects = item.projects_all"
                    dark
                    v-bind="attrs"
                    v-on="on"
                  >Add Projects</v-btn>
                </template>
                <v-card>
                  <v-card-title class="text-h5">Add Projects</v-card-title>
                  <v-card-text>
                    <v-data-table
                      :headers="projectHeaders"
                      :items="filteredProjects"
                      item-key="id"
                      :search="projectSearch"
                    >
                      <template v-slot:item.projectactions="project">
                        <v-btn
                          color="primary"
                          @click="addProjectForUser(item.id, project.item.id)"
                        >Add Project</v-btn>
                      </template>
                      <template v-slot:top>
                        <v-text-field v-model="projectSearch" label="Search" class="mx-4"></v-text-field>
                      </template>
                    </v-data-table>
                  </v-card-text>
                  <v-divider></v-divider>
                </v-card>
              </v-dialog>
              <!-- <v-btn color="red" text @click="dialog = false">Close</v-btn> -->
            </v-card-actions>
          </v-card>
        </v-dialog>
      </template>
      <template v-slot:top>
        <v-text-field v-model="search" label="Search" class="mx-4"></v-text-field>
      </template>
    </v-data-table>
  </v-form>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Users',
  mounted () {
    this.$store.dispatch('adminFetchUserProjects')
    this.$store.dispatch('adminFetchProjects')
  },
  data () {
    return {
      projectSearch: '',
      search: '',
      currentProjects: []
    }
  },
  methods: {
    coordinatorSwitch (userId, projectId, value) {
      this.$store.dispatch('updateUserProject', { userId, projectId, value, key: 'coordinator' })
    },
    addProjectForUser (userId, projectId) {
      this.$store.dispatch('addProjectToUser', { userId, projectId }).then(() => {
        this.$store.dispatch('adminFetchUserProjects')
      })
      // Update locally to remove from option in all projects list
      const addedProject = this.allProjects.find((project) => project.id === projectId)
      addedProject.pivot = { coordinator: 0, notify_catches: 0, notify_inspections: 0, notify_problems: 0 }
      this.currentProjects.push(addedProject)
    },
    removeUserFromProject (userId, projectId) {
      this.$store.dispatch('removeUserFromProject', { userId, projectId }).then(() => {
        this.$store.dispatch('adminFetchUserProjects')
      })
    }
  },
  computed: {
    filteredProjects () {
      return this.allProjects.filter((element) => {
        return !this.currentProjects.some(userProj => userProj.id === element.id)
      })
    },
    ...mapGetters(['allUsers', 'allProjects', 'userEditError']),
    projectHeaders () {
      return [
        {
          text: 'Project Name',
          align: 'left',
          value: 'name'
        },
        {
          text: 'Actions',
          align: 'center',
          value: 'projectactions'
        }
      ]
    },
    headers () {
      return [
        {
          text: 'User',
          align: 'center',
          sortable: true,
          value: 'name'
        },
        {
          text: 'Email',
          align: 'left',
          sortable: false,
          value: 'email'
        },
        {
          text: 'Created',
          align: 'center',
          sortable: true,
          value: 'created_at'
        },
        {
          text: 'Updated',
          align: 'center',
          sortable: true,
          value: 'updated_at'
        },
        {
          text: 'Projects',
          align: 'center',
          value: 'projects_all.length'
        },
        {
          text: 'Actions',
          align: 'center',
          value: 'actions'
        }
      ]
    }
  }
}
</script>
