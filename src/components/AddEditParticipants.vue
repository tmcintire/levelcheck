<template>
      <div v-if="event" class="container flex-col">
        <RegistrationsList :selectedParticipant="selectedParticipant" v-on:participantSelected="selectParticipant" />
        <b-button type="submit" variant="primary" @click="newRegistration">New Registration</b-button>
        <AddEditParticipant v-if="selectedParticipant" :selectedParticipant="selectedParticipant" :eventId="event.eventId" v-on:close="closeModal"/>
      </div>
      <div v-else>
        <h3>Please select an event first</h3>
        <EventSelector />
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { store } from '../store';
import { IParticipant, IEvent } from '../data/interfaces';
import EventSelector from '@/components/EventSelector.vue'; // @ is an alias to /src;
import RegistrationsList from '@/components/RegistrationsList.vue'; // @ is an alias to /src;
import AddEditParticipant from '@/components/AddEditParticipant.vue'; // @ is an alias to /src;
import { mapState } from 'vuex';
import { getNextId } from '../helpers';
import { addParticipant } from '../data/api';
import { v4 as uuid } from 'uuid';

@Component({
  components: {
    EventSelector,
    RegistrationsList,
    AddEditParticipant,
  },
  computed: mapState(['event']),
})
export default class AddEditParticipants extends Vue {
    public selectedParticipant: IParticipant = null;

    public selectParticipant(payload: any) {
        this.selectedParticipant = {...payload.participant, id: payload.id};
    }

    public closeModal() {
      this.selectedParticipant = null;
    }

    public newRegistration() {
      this.selectedParticipant = {
        name: '',
        bib: '',
        finalLevel: '',
        originalLevel: '',
        id: uuid(),
      };
    }
}
</script>
