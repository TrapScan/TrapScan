<template>
  <div class="about">
    <div class="mb-4">
      <div class="card pa-5 mb-2 green">
        <!-- <h2 class="white--text">About Us</h2> -->
        <p id="intro" class="white--text">
          TrapScan is a mobile web application designed by conservation
          volunteers to simplify their record keeping and reporting workload.
        </p>
      </div>
      <v-expansion-panels multiple flat class="my-6">
        <CollapseableSection title="Commitment to Volunteers">
          Our primary mission is to make the recording and viewing of trap activity
          easy and accessible. This includes welcoming general members
          of public get involved by letting trappers know of catches they see,
          without needing to create an account.
          <br />
          <br />We want to minimise the time it takes to record data to free up more
          time for volunteers to do the real work that makes a difference. By
          making it easier we hope to increase how much data is captured,
          therefore making the bigger picture more clear. The more we know about
          what's happening and the results of our efforts, the more we can learn
          from each other and make better decisions we can make as a nation.
          <br />
          <br />We want everyone to be able to see these results though, not just the
          data gurus tucked away in offices. That's why we display this data in
          a clear and simple way. We hope that the work will become more
          engaging if the volunteers can track their efforts and view progress
          without having to wrestle with spreadsheets and file management.
        </CollapseableSection>
        <CollapseableSection title="Commitment to Project Coordinators">
          Our second mission is to help project coordinators get more done in
          less time by removing some of their common pain points and providing
          tooling to make their life easier.
          <br />
          <br />In future plan to build in volunteer relationship and asset management
          features, and to improve the project onboarding and offboarding
          experiences for both parties.
          <br />
          <br />We believe that volunteer project coordinators are modern day heroes
          and without them we'd have no chance at saving our species from the
          grizzly demise they face. For that we want to repay their efforts by
          catering directly to them, so if you are a project coordinator and
          have some ideas, please reach out :)
        </CollapseableSection>
      <!-- </v-expansion-panels>
      <v-expansion-panels multiple flat class="my-6"> -->
        <CollapseableSection
          title="Our native wildlife and pest problems"
        >
          Aotearoa New Zealand was isolated for 80 million years and was the
          last place on earth that primates set foot. Flora and fauna evolved in
          a very curious and unique way with the absence of predatory mammals.
          Many of our species are only found here which makes them
          internationally significant and important to protect.
          <br />
          <br />The introduction of mammalian pests with the arrival of humans led to
          the extinction of over 65 of our most treasured species and to this
          day we are still losing the battle...
          <br />
          <br />
          <span>To learn more watch the<a
            id="documentary-link"
            href="https://www.rnz.co.nz/programmes/fight-for-the-wild"
          >Fight for the Wild documentary</a></span>
        </CollapseableSection>
        <CollapseableSection :end="true" title="Upcoming features">
          <ul>
            <li>My history - see your previous scans, and can edit them</li>
            <li>Default baits - uses what you've set per trap type instead of asking you every time</li>
            <li>Trapline check-in - time your run and bulk update any traps you didn’t scan</li>
            <li>Leaderboards - see by person, by trap, by project and globally</li>
            <li>Nearby Projects - like Nearby Traps but for top 5 closest projects to join</li>
          </ul>
        </CollapseableSection>
      </v-expansion-panels>
      <div class="card pa-5 my-5 yellow">
        <!-- <h2 class="black--text mb-1">Public Beta</h2> -->

        <p class="blurb black--text">
          TrapScan is in it's first release so if you find any bugs, have ideas
          or any feedback, we would love to hear from you.
        </p>
      </div>
      <div class="d-flex align-center justify-center">
        <v-btn class="mt-2 rounded primary white--text" elevation="0" to="/contact">Contact Us</v-btn>
      </div>
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

.rounded {
  border-radius: 100px !important;
}
</style>
