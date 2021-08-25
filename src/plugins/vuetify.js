import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'

import Hedgehog from '../components/Icons/Hedgehog.vue'
import Mouse from '../components/Icons/Mouse.vue'
import Rat from '../components/Icons/Rat.vue'
import Stoat from '../components/Icons/Stoat.vue'
import Weasel from '../components/Icons/Weasel.vue'

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
      }
    }
  }
})
