import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'

// Species Caught
import Hedgehog from '../components/Icons/Hedgehog.vue'
import Mouse from '../components/Icons/Mouse.vue'
import Rat from '../components/Icons/Rat.vue'
import Stoat from '../components/Icons/Stoat.vue'
import Weasel from '../components/Icons/Weasel.vue'
import SomethingElse from '../components/Icons/SomethingElse.vue'

// Baits
import PeanutButter from '../components/Icons/PeanutButter.vue'
import Egg from '../components/Icons/Egg.vue'

Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    values: {
      hedgehog: {
        component: Hedgehog
      },
      mouse: {
        component: Mouse
      },
      rat: {
        component: Rat
      },
      stoat: {
        component: Stoat
      },
      weasel: {
        component: Weasel
      },
      somethingElse: {
        component: SomethingElse
      },
      peanutbutter: {
        component: PeanutButter
      },
      goodnatureratandmouselure: {
        component: PeanutButter
      },
      dehydratedrabbit: {
        component: PeanutButter
      },
      chocolate: {
        component: PeanutButter
      },
      wholeegg: {
        component: Egg
      }
    }
  }
})
