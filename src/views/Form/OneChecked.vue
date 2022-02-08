<template>
  <div class="form-options">
    <div v-if="showMap">
      <small class="obscure">Name: {{ scannedTrap.name }}</small>
      <br>
      <small class="obscure">NZID: {{ scannedTrap.nz_trap_id }}</small>
    </div>
    <h2>I checked this trap {{ scannedCodeValue }} and...</h2>
    <div class="d-flex flex-column justify-end" style="height: 90%">
      <ChildForm
        v-for="option in options"
        :icon="option.icon"
        :goesTo="option.goesTo"
        :key="option.title"
        :name="option.title"
        :subtext="option.subtext"
        :formData="option.formData"
        :title="option.title"
      ></ChildForm>
      <div v-if="showMap" @click="openMap">
        <ChildForm
          dumb
          icon="SomethingIsWrong"
          :goesTo="99"
          name="Re-map QR"
          subtext="Change the Trap.NZ trap ID associated with this QR code."
          title="Re-map QR"
          :formData="{}"
        ></ChildForm>
      </div>
    </div>

    <MapTrap @close="openMap" title="Remap Trap" :showDialog="openMapDialog" :nz_id="scannedNZID"></MapTrap>
  </div>
</template>

<script>
import ChildForm from './ChildFom'
import { mapGetters } from 'vuex'
import MapTrap from '../../components/MapTrap.vue'
export default {
  components: {
    ChildForm,
    MapTrap
  },
  methods: {
    openMap (code) {
      if (code && typeof code === 'string') {
        // This trap has been remapped
        this.$store.dispatch('updateScannedQRID', code)
      }
      this.openMapDialog = !this.openMapDialog
    }
  },
  data () {
    return {
      openMapDialog: false,
      options: [
        {
          title: 'It was empty',
          goesTo: 2,
          icon: 'TrapMissing',
          formData: {
            strikes: 0,
            species_caught: 'None',
            trap_condition: 'Ok',
            words: 'The trap caught nothing, '
          }
        },
        {
          title: 'Something was in it',
          goesTo: 3,
          icon: 'SomethingIsInit',
          formData: {
            strikes: 0,
            status: 'Sprung',
            trap_condition: 'Ok',
            words: 'The trap caught a '
          }
        },
        {
          title: 'Something\'s wrong',
          goesTo: 4,
          icon: 'SomethingIsWrong',
          formData: {
            strikes: 0,
            species_caught: 'None',
            rebaited: 'No',
            bait_type: 'None'
          }
        }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'scannedCodeValue',
      'scannedNZID',
      'scannedTrap',
      'pcordOptions'
    ]),
    showMap () {
      if (this.pcordOptions && this.pcordOptions.length > 0) {
        for (let i = 0; i < this.pcordOptions.length; i++) {
          const element = this.pcordOptions[i]
          if (element.id === this.scannedTrap.project_id) return true
        }
      }
      return false
    }
  }
}
</script>

<style lang="scss" scoped>
.obscure {
  color: grey;
}
</style>
