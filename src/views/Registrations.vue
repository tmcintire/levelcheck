<template>
  <div v-if="event" class="registrations">
    <h1>Participants for {{event.name}}</h1>
    <div class="flex-row flex-space-around">
      <div class="flex-col" v-if="event">
        <h4>This is the current vuex store for "participants":</h4>
        <div class="flex-row" v-for="(participant, key) in event.participants" :key="key">
          <span>
            {{participant.name}} {{participant.bib}} - {{participant.originalLevel}} 
            <span v-if="participant.finalLevel">- {{participant.finalLevel}}</span>
          </span>
        </div>
      </div>
    </div>
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
export default class Registrations extends Vue {}
</script>
