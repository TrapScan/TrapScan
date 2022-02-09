<template>
  <v-app :style="{background: $vuetify.theme.themes[theme].background, height: '100%'}">
    <!-- <inspection-nav-bar ></inspection-nav-bar> -->
    <navbar v-if="showNavBar" :elevation="elevation"></navbar>
    <v-main>
      <v-container fluid style="height: 100%">
        <transition :name="transitionName" :mode="transitionMode">
          <router-view></router-view>
        </transition>
      </v-container>
    </v-main>
    <v-footer v-if="isUserAuth && showNavBar" height="70%" color="white" padless app>
        <bottom-nav id="main-bottom-nav" :elevation="elevation"></bottom-nav>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import Navbar from './components/Navbar'
// import InspectionNavBar from './components/InspectionNavbar.vue'
import BottomNav from './components/BottomNav'
import * as Sentry from '@sentry/vue'
// import firebase from 'firebase'
export default {
  name: 'App',
  components: {
    Navbar,
    BottomNav
    // InspectionNavBar
  },
  data: () => ({
    transitionName: 'slide',
    transitionMode: 'out-in',
    elevation: 5
  }),
  mounted () {
    this.$store.dispatch('fetchStats')
    if (this.getUser) {
      Sentry.setUser({ email: this.getUser.email, name: this.getUser.name })
    }
  },
  computed: {
    ...mapGetters(['getUser', 'isUserAuth', 'showNavBar']),
    theme () {
      return (this.$vuetify.theme.dark) ? 'dark' : 'light'
    }
  },
  watch: {
    '$route' (to, from) {
      if (to.path === '/settings') {
        // slide down
        this.transitionName = 'slide-down'
        this.transitionMode = 'out-in'
        this.elevation = 0
      } else if (from.path === '/settings') {
        // slide up
        this.transitionName = 'slide-up'
        this.transitionMode = 'out-in'
        this.elevation = 5
      } else {
        this.transitionName = 'slide'
        this.transitionMode = 'out-in'
        // this.elevation = 5
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../node_modules/typeface-roboto/index.css';
#main-bottom-nav {
  height:100% !important;
}

.slide-enter-active,
.slide-leave-active {
  transition: opacity .1s, transform .1s;
}

.slide-enter,
.slide-leave-to {
  opacity: 0;
  transform: translate(-30%);
}

.slide-down-enter-active {
  animation: slideDown 0.2s;
}
@keyframes slideDown {
  0% {
    transform: translateY(-400px);
  }
  100% {
    transform: translateY(0);
  }
}

.slide-up-enter-active {
  animation: fadeIn 0.2s;
}
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}
.slide-up-leave-active {
  animation: slideUp 0.2s;
}
@keyframes slideUp {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-400px);
  }
}
</style>
