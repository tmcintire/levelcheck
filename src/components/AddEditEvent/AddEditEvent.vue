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

        <EventInfo v-on:updateField="handleUpdate"/>

        <v-btn color="primary" @click="newEvent = 2">Continue</v-btn>
        <v-btn text @click="$emit('close')">Cancel</v-btn>
      </v-stepper-content>

      <v-stepper-content step="2">
        <LevelInfo v-on:updateField="handleUpdate" v-on:newLevel="addNewLevel" :levels="event.levels"/>

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

@Component({
  components: {
    EventInfo,
    LevelInfo
  }
})
export default class AddEditLevel extends Vue {
    public newEvent: number = 0;
    public newLevelId = uuid();
    public event: IEvent = {
      name: '',
      levels: {
        [this.newLevelId]: {
          name: '',
          levelCheck: false,
          id: this.newLevelId,
        }
      },
      participants: null,
      eventId: null,
    };

    public addNewLevel(){
      const levelId = uuid();
      this.event.levels = { ...this.event.levels, 
        [levelId]: {
          name: '',
          levelCheck: false,
          id: levelId,
      }}
    }

    public handleUpdate(data: {property: any, field: any, value: any, key?: any}) {
      if (data.key) {
        this.event[data.property][data.key][data.field] = data.value;
      } else {
        this.event[data.field] = data.value;
      }
    }

    public createEvent() {
        console.log('creating event');
    }

}
</script>
