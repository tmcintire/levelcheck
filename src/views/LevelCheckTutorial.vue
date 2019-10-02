<template>
  <div class="registrations">
    <h1>Level check user tutorial</h1>
    <v-btn @click="skipTutorial">Skip tutorial</v-btn>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { skipTutorial } from '../data/api';
import { router } from '../router';

@Component
export default class LevelCheckTutorial extends Vue {
  public skipTutorial() {
    const needsLCTutorial = this.$store.getters.user.levelCheckTutorial;

    skipTutorial('levelCheckTutorial', false).then(() => {
      router.push('levelcheck');
    });
  }
}
</script>
