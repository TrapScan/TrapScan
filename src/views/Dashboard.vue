<template>
  <div>
    <v-card color="primary" elevation="10" dark class="mx-auto mb-7" max-width="500">
      <v-list-item two-line>
        <v-list-item-content>
          <v-card-title class="text-h5 mb-1">My Stats</v-card-title>
          <v-row no-gutters justify="start" align="center">
            <v-text-field
              class="readonly"
              outlined
              label="Inspections"
              append-icon="mdi-eye-outline"
              :value="getUser.inspections"
              readonly
            ></v-text-field>
          </v-row>
          <v-row no-gutters justify="start" align="center">
            <v-text-field
              class="readonly"
              outlined
              label="Catches"
              append-icon="mdi-skull-outline"
              :value="getUser.catches"
              readonly
            ></v-text-field>
          </v-row>
        </v-list-item-content>
      </v-list-item>
    </v-card>

    <v-card color="accent" elevation="10" dark  class="mx-auto" max-width="500">
      <v-list-item two-line>
        <v-list-item-content>
          <v-card-title class="text-h5 mb-1">Global Stats</v-card-title>
          <v-row no-gutters justify="start" align="center">
            <v-text-field
              class="readonly"
              outlined
              label="Global Inspections"
              append-icon="mdi-eye-outline"
              :value="getGlobalStats.total_inspections"
              readonly
            ></v-text-field>
          </v-row>
          <v-row no-gutters justify="start" align="center">
            <v-text-field
              class="readonly"
              outlined
              label="Global Catches"
              append-icon="mdi-skull-outline"
              :value="getGlobalStats.total_catches"
              readonly
            ></v-text-field>
          </v-row>
          <v-row no-gutters justify="start" align="center">
            <v-text-field
              class="readonly"
              outlined
              label="Inspections Per User"
              append-icon="mdi-account-search-outline"
              :value="getGlobalStats.average_inspections_per_user"
              readonly
            ></v-text-field>
          </v-row>
          <v-row no-gutters justify="start" align="center">
            <v-text-field
              class="readonly"
              outlined
              label="Catches Per User"
              append-icon="mdi-skull-scan-outline"
              :value="getGlobalStats.average_catches_per_user"
              readonly
            ></v-text-field>
          </v-row>
        </v-list-item-content>
      </v-list-item>
    </v-card>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters(['getUser', 'getGlobalStats'])
  }
}
</script>
