<template>
    <v-stepper v-model="newEvent">
    <v-stepper-header>
      <v-stepper-step :complete="newEvent > 1" step="1">Name of step 1</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="newEvent > 2" step="2">Name of step 2</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step step="3">Name of step 3</v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1" title="Event">

        <EventInfo :name="selectedEvent.name"/>

        <v-btn color="primary" @click="newEvent = 2">Continue</v-btn>
        <v-btn text @click="$emit('close')">Cancel</v-btn>
      </v-stepper-content>

      <v-stepper-content step="2">
        <LevelInfo :levels="selectedEvent.levels"/>

        <v-btn color="primary" @click="newEvent = 3">Continue</v-btn>
        <v-btn color="primary" @click="newEvent -= 1">Back</v-btn>
        <v-btn text @click="$emit('close')">Cancel</v-btn>
      </v-stepper-content>

      <v-stepper-content step="3">
        

        <v-btn color="primary" @click="createEvent">Submit</v-btn>
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
import { IEvent } from '../../data/interfaces';
import uuid from 'uuid';
import { mapState } from 'vuex';
import { createEvent } from '../../data/api';

@Component({
  components: {
    EventInfo,
    LevelInfo,
  },
  computed: mapState(['selectedEvent']),
})
export default class AddEditEvent extends Vue {
    public newEvent: number = 0;

    public createEvent() {
      createEvent(this.$store.state.selectedEvent);
      this.$emit('close');
    }
}
</script>
