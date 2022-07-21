<template>
  <div>
    <v-card color="card" elevation="3" class="mx-auto mb-10 mt-5" max-width="500">
      <v-card-title class="align-start">
        <div class="overflow-hidden mt-n9 transition-swing v-card--material__sheet v-sheet theme--light elevation-6 rounded" style="max-width: 100%; background-color: #F2B148">
          <div class="pa-8">
            <v-icon dark large>
              mdi-chart-timeline
            </v-icon>
          </div>
        </div>
        <div class="text-h4 v-card--material__title pl-3">
          My Stats
          <div class="text-subtitle-1 mb-n4">
          </div>
        </div>
      </v-card-title>
      <hr role="separator" aria-orientation="horizontal" class="mt-2 mx-4 v-divider theme--light">
      <v-list-item two-line>
        <v-list-item-content>
          <v-card-title class="text-h5 mb-1">Today`s catches</v-card-title>
          <tamplate v-if="getUser.stats_per_day !== null">
            <v-row  no-gutters justify="start" align="center" class="d-flex justify-space-between px-4" v-for="(value, index) in getUser.stats_per_day" :key="index">
              <p class="font-weight-bold">
                {{index}}:
              </p>
              <div>
                {{value}}
              </div>
            </v-row>
          </tamplate>
          <v-row v-else no-gutters justify="start" align="center" class="d-flex justify-center px-4">
            <div class="text-truncate"> Nothing </div>
          </v-row>
          <v-card-title class="text-h5 mb-1">For All Time</v-card-title>
          <v-row no-gutters justify="start" class="d-flex justify-space-between px-4" align="center">
            <p class="font-weight-bold">
              Inspections:
            </p>
            <div>
              {{getUser.inspections}}
            </div>
          </v-row>
          <v-row no-gutters justify="start" class="d-flex justify-space-between px-4" align="center">
            <p class="font-weight-bold">
              Catches:
            </p>
            <div>
              {{getUser.catches}}
            </div>
          </v-row>
        </v-list-item-content>
      </v-list-item>
    </v-card>

    <v-card color="card" elevation="3" class="mx-auto " max-width="500">
      <v-card-title class="align-start">
        <div class="overflow-hidden mt-n9 transition-swing v-card--material__sheet v-sheet theme--light elevation-6 rounded" style="max-width: 100%; background-color: #F2B148">
          <div class="pa-8">
            <v-icon dark large>
              mdi-chart-line
            </v-icon>
          </div>
        </div>
        <div class="text-h4 v-card--material__title pl-3">
          Global Stats
          <div class="text-subtitle-1 mb-n4">
          </div>
        </div>
      </v-card-title>
      <v-list-item two-line>
        <v-list-item-content>
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
