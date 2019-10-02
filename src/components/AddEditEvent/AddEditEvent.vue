<template>
    <v-stepper v-model="newEvent">
    <v-stepper-header>
      <v-stepper-step :complete="newEvent > 1" step="1">Event Details</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="newEvent > 2" step="2">Level Details</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step step="3">Other Steps</v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1" title="Event">

        <EventInfo :name="name"/>

        <v-btn color="primary" @click="newEvent = 2">Continue</v-btn>
        <v-btn text @click="$emit('close')">Cancel</v-btn>
      </v-stepper-content>

      <v-stepper-content step="2">
        <LevelInfo :levels="levels"/>

        <v-btn color="primary" @click="newEvent = 3">Continue</v-btn>
        <v-btn color="primary" @click="newEvent -= 1">Back</v-btn>
        <v-btn text @click="$emit('close')">Cancel</v-btn>
      </v-stepper-content>

      <v-stepper-content step="3">
        <EventConfig :config="config"/>

        <v-btn color="primary" @click="addEditEvent">Submit</v-btn>
        <v-btn color="primary" @click="newEvent -= 1">Back</v-btn>
        <v-btn text @click="$emit('close')">Cancel</v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import * as _ from 'lodash';
import EventInfo from './EventInfo.vue';
import LevelInfo from './LevelInfo.vue';
import EventConfig from './EventConfig.vue';
import { IEvent, IApplicationState, ILevel } from '../../data/interfaces';
import uuid from 'uuid';
import { mapState } from 'vuex';
import { addEditEvent } from '../../data/api';

@Component({
  components: {
    EventInfo,
    LevelInfo,
    EventConfig,
  },
  computed: mapState({
        levels: (state: IApplicationState) => {
            if (state.selectedEvent) {
                return Object.entries(state.selectedEvent.levels).map((level: [string, ILevel]) => {
                    return {...level[1], id: level[0]};
                }).sort((a, b) => a.order - b.order);
            }
             
        },
        selectedEvent: (state: IApplicationState) => state.selectedEvent,
        name: (state: IApplicationState) => state.selectedEvent.name,
        config: (state: IApplicationState) => state.selectedEvent.config,
    }),
})
export default class AddEditEvent extends Vue {
    public newEvent: number = 0;
    public selectedEvent!: IEvent;

    public addEditEvent() {
      addEditEvent(this.$store.state.selectedEvent).then(() => {
        this.$emit('close');
      });
    }
}
</script>
