<template>
  <div>
    <h1>{{ event.name }}</h1>
    <p>Registrations - {{ participantsCount }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import * as _ from 'lodash'
import { IParticipant, IApplicationState } from '../data/interfaces'
import { mapState } from 'vuex'

@Component({
  computed: mapState({
    event: (state: IApplicationState) => state.event,
    participantsCount: (state: IApplicationState) =>
      state.event.participants && Object.keys(state.event.participants).length,
  }),
})
export default class EventSummary extends Vue {}
</script>
