<template>
  <div>
    <v-card color="card" elevation="3" class="mx-auto mb-10 mt-5" max-width="500">
      <v-card-title class="align-start">
        <div class="text-h4 v-card--material__title pl-3">
          My Stats
          <v-icon large>
            mdi-chart-bar
          </v-icon>
          <div class="text-subtitle-1 mb-n4">
          </div>
        </div>
      </v-card-title>
      <hr role="separator" aria-orientation="horizontal" class="mt-2 mx-4 v-divider theme--light">
      <v-list-item two-line>
        <v-list-item-content>
          <v-card-title class="text-h5 mb-1">{{getUser.stats_per_day !== null ? 'Today`s catches' : 'No catches today'}}</v-card-title>
            <v-row  no-gutters justify="start" align="center" class="d-flex justify-space-between px-4" v-for="(value, index) in getUser.stats_per_day" :key="index">
              <p class="font-weight-bold">
                {{index}}:
              </p>
              <div>
                {{value}}
              </div>
            </v-row>
          <v-card-title class="text-h5 mb-1">My total</v-card-title>
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
        <div class="text-h4 v-card--material__title pl-3 justify-space-between">
          Global Stats
          <v-icon large>
            mdi-chart-line
          </v-icon>
          <div class="text-subtitle-1 mb-n4">
          </div>
        </div>
      </v-card-title>
      <hr role="separator" aria-orientation="horizontal" class="mt-2 mx-4 v-divider theme--light">

      <v-list-item two-line>
        <v-list-item-content>
          <v-row no-gutters justify="start" class="d-flex justify-space-between px-4" align="center">
            <p class="font-weight-bold">
              Global Inspections:
            </p>
            <div>
              {{getGlobalStats.total_inspections}}
            </div>
          </v-row>
          <v-row no-gutters justify="start" class="d-flex justify-space-between px-4" align="center">
            <p class="font-weight-bold">
              Global Catches:
            </p>
            <div>
              {{getGlobalStats.total_catches}}
            </div>
          </v-row>
          <v-row no-gutters justify="start" class="d-flex justify-space-between px-4" align="center">
            <p class="font-weight-bold">
              Inspections Per User:
            </p>
            <div>
              {{getGlobalStats.average_inspections_per_user}}
            </div>
          </v-row>
          <v-row no-gutters justify="start" class="d-flex justify-space-between px-4" align="center">
            <p class="font-weight-bold">
              Catches Per User:
            </p>
            <div>
              {{getGlobalStats.average_catches_per_user}}
            </div>
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
