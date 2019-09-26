<template>
  <div v-if="event" class="registrations">
    <h1>Level check for {{ event.name }}</h1>
  </div>
  <div v-else>
    <h3>Please select an event first</h3>
    <EventSelector />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { store } from '../store';
import { IParticipant } from '../data/interfaces';
import EventSelector from '@/components/EventSelector.vue'; // @ is an alias to /src;
import { mapState } from 'vuex';
import { getNextId } from '../helpers';

@Component({
  components: {
    EventSelector,
  },
  computed: mapState(['event']),
})
export default class LevelCheck extends Vue {}
</script>
