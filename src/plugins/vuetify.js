import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader

import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'

// Species Caught
import Hedgehog from '../components/Icons/Hedgehog.vue'
import Mouse from '../components/Icons/Mouse.vue'
import Rat from '../components/Icons/Rat.vue'
import Stoat from '../components/Icons/Stoat.vue'
import Weasel from '../components/Icons/Weasel.vue'
import SomethingElse from '../components/Icons/SomethingElse.vue'

// Buticons
import LetUsKnow from '../components/form_icons/LetUsKnow.vue'
import AddNote from '../components/form_icons/AddNote.vue'
import BaitGood from '../components/form_icons/BaitGood.vue'
import BaitMissing from '../components/form_icons/BaitMissing.vue'
import BaitOld from '../components/form_icons/BaitOld.vue'
import Edit from '../components/form_icons/Edit.vue'
import NeedsRepair from '../components/form_icons/NeedsRepair.vue'
import QRBroken from '../components/form_icons/QRBroken.vue'
import QRCode from '../components/form_icons/QRCode.vue'
import SomethingIsInit from '../components/form_icons/SomethingIsInIt.vue'
import SomethingWrong from '../components/form_icons/SomethingWrong.vue'
import Sprung from '../components/form_icons/Sprung.vue'
import Submit from '../components/form_icons/Submit.vue'
import TrapMissing from '../components/form_icons/TrapMissing.vue'

// Baits
import PeanutButter from '../components/Icons/PeanutButter.vue'
import Egg from '../components/Icons/Egg.vue'
import Chocolate from '../components/Icons/Chocolate.vue'
import DehydratedRabbit from '../components/Icons/DehydratedRabbit.vue'
import SomethingElseAlt from '../components/Icons/SomethingElseAlt.vue'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    options: { customProperties: true }
  },
  icons: {
    iconfont: 'mdi',
    values: {
      LetUsKnow: {
        component: LetUsKnow
      },
      AddNote: {
        component: AddNote
      },
      BaitGood: {
        component: BaitGood
      },
      BaitMissing: {
        component: BaitMissing
      },
      BaitOld: {
        component: BaitOld
      },
      Edit: {
        component: Edit
      },
      NeedsRepair: {
        component: NeedsRepair
      },
      QRBroken: {
        component: QRBroken
      },
      QRCode: {
        component: QRCode
      },
      SomethingIsInit: {
        component: SomethingIsInit
      },
      SomethingIsWrong: {
        component: SomethingWrong
      },
      Sprung: {
        component: Sprung
      },
      Submit: {
        component: Submit
      },
      TrapMissing: {
        component: TrapMissing
      },
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
        component: DehydratedRabbit
      },
      chocolate: {
        component: Chocolate
      },
      wholeegg: {
        component: Egg
      },
      somethingElseAlt: {
        component: SomethingElseAlt
      }
    }
  }
})
