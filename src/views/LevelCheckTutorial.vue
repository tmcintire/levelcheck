<template>
  <div class="registrations">
    <h1>Level check user tutorial</h1>
    <b-button @click="skipTutorial">Skip tutorial</b-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { store } from '../store';
import { IParticipant } from '../data/interfaces';
import EventSelector from '@/components/EventSelector.vue'; // @ is an alias to /src;
import { mapState } from 'vuex';
import { getNextId } from '../helpers';
import { skipTutorial } from '../data/api';
import { router } from '../router';

@Component
export default class LevelCheckTutorial extends Vue {
  public skipTutorial() {
    const needsLCTutorial = store.getters.user.levelCheckTutorial;
    console.log(store);

    skipTutorial('levelCheckTutorial', false).then(() => {
      router.push('levelcheck');
    });
  }
}
</script>
