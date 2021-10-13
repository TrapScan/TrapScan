<template>
  <div class="about">
    <div class="mb-4">
      <div class="card pa-5 mb-2 darkblue">
        <h2 class="white--text">About Us</h2>
        <p id="intro" class="mt-2 white--text">
          TrapScan is a mobile web application designed by conservation
          volunteers to help simplify the administrative parts of their work.
        </p>
      </div>
      <v-expansion-panels multiple flat class="my-6">
        <CollapseableSection title="Commitment to Volunteers">
          Our primary mission is to make it easier for volunteers to record and
          view their trapping activity. <br />By minimising the time it takes to
          record data, we allow more time for volunteers to do the work that
          counts - we also increase the chance of volunteers recording data in
          the first place, which helps to inform bigger picture decision-making.
          <br />By displaying data back to volunteers in a simple and insightful
          way, the work becomes more engaging they can see the impact they are
          having without having to wrestle with spreadsheets and formulas.
          <br />We want data and insights it to be as user friendly as possible,
          and it\'s value accessible to everyone regardless of their technical
          know-how
        </CollapseableSection>
        <CollapseableSection :end="true" title="Commitment to Project Coordinators">
           Our second mission is to assist project coordinators in managing their
          volunteer base. We want to remove some of the common pain points they
          face, and help them to get more done in less time. We believe that
          without these unsung heroes we wouldn't have a chance, so want to
          repay their efforts by catering directly to them.
        </CollapseableSection>
      </v-expansion-panels>
      <div class="card pa-5 my-5 red">
        <h2 class="white--text mb-1">Public Beta</h2>

        <p class="blurb white--text">
          TrapScan is in it's first release so if you find any bugs, have ideas
          or any feedback, we would love to hear from you.
        </p>
        <a> TODO: Contact Us </a>
      </div>
      <v-expansion-panels multiple flat class="my-6">
        <CollapseableSection title="The significance of our wildlife and the problem of mammalian pests">
          Aotearoa New Zealand was isolated for 80 million years and was the
          last place on earth that primates set foot. Flora and fauna evolved in
          a very curious and unique way with the absence of predatory mammals,
          and many of our species are only found here which makes them
          internationally significant. The introduction of mammalian pests with
          the arrival of humans led to the extinction of over 65 of our most
          treasured species and to this day we are still losing the battle…
        </CollapseableSection>
        <CollapseableSection :end="true" title="Fight for the Wild">
          Every year an army of introduced predators devours the eggs and chicks
          of some 26 million native New Zealand birds, as well as countless
          insects, amphibians, reptiles and plants. We currently have more than
          4000 natives on the threatened species list and many more vulnerable
          to predation – New Zealand’s catalogue of shame. But in 2016, the
          nation decided enough was enough. Predator Free 2050 was born — an
          eviction order served on the three most voracious predators — rats,
          stoats and possums. It’s our most ambitious conservation effort ever
          and is to be enforced by hundreds of thousands of ordinary Kiwis. In
          Fight for the Wild we walk with the kaitiaki, ecologists, inventors
          and community trappers desperately defending our taonga species. We
          follow the fortunes of kea, kiwi, kakariki and other native species
          and discover the fascinating initiatives underway as we come to their
          rescue. We examine the tough choices our nation needs to make as we
          navigate the challenges of protecting our wildlife. And among the hard
          decisions and desperate losses, we discover bold visions, hard won
          victories and hope. Fight for the Wild is a call to action for all New
          Zealanders. It tells how each of us holds a piece of a jigsaw, and
          how, if we all play our part, we might just see a wilderness saved and
          our Wild returned.<a
            id="documentary-link"
            href="https://www.rnz.co.nz/programmes/fight-for-the-wild"
            >Fight for the Wild documentary</a
          >
        </CollapseableSection>
      </v-expansion-panels>
    </div>
  </div>
</template>

<script>
import CollapseableSection from '../components/about/CollapseableSection.vue'
export default {
  components: {
    CollapseableSection
  }
}
</script>

<style lang="scss" scoped>
#intro {
  font-size: 1.3rem;
  line-height: 120%;
  margin-bottom: 0 !important;
}

#documentary-link {
  font-weight: bold;
  padding: 6px;
  border-radius: 5px;
}

.blurb {
  margin-bottom: 0 !important;
}

.extra-space {
  line-height: 150% !important;
}
</style>
