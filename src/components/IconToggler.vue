<template>
  <div>
    <input type="checkbox" v-model="dark_mode" class="icon-toggler" id="icon-toggler">
    <label class="icon-toggler-label" for="icon-toggler">
      <v-icon class="dark" color="yellow" dense>mdi-moon-waning-crescent</v-icon>
      <v-icon class="light" color="yellow" dense>mdi-white-balance-sunny</v-icon>
      <div class="ball"></div>
    </label>
  </div>
</template>

<script>
export default {
  data () {
    return {
      checked: false
    }
  },
  computed: {
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

<style lang="scss" scoped>
  label {
    width: 50px;
    height: 26px;
    background-color: white;
    box-shadow: inset 0px 0px 9px 0px rgba(181,181,181,0.95);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px;
    border-radius: 50px;
    position: relative;
  }
  .ball {
    width: 22px;
    height: 22px;
    top: 2px;
    left: 2px;
    background-color: #b3b3b3;
    position: absolute;
    border-radius: 50%;
    transition: transform 0.2s linear;
    transition: background-color 0.5s ease;
  }

  .icon-toggler {
    opacity: 0;
    position: absolute;
  }

  .icon-toggler:checked + .icon-toggler-label .ball {
    transform: translate(24px);
    background-color: darkgray;
  }

  .icon-toggler:checked + .icon-toggler-label {
    background-color: black;
    box-shadow: none;
  }
</style>
