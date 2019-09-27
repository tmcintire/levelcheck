<template>
  <div>
        <h1>{{event.name}}</h1>
        <p>Registrations - {{participantsCount}}</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import * as _ from 'lodash';
import { IParticipant } from '../data/interfaces';
import { mapState } from 'vuex';
import { IParticipantState } from '../store';

@Component({
    computed: mapState({
      event: (state: IParticipantState) => state.event,
      participantsCount: (state: IParticipantState) => Object.keys(state.event.participants).length,
    }),
})
export default class EventSummary extends Vue {
}
</script>
