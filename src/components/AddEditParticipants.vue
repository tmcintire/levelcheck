<template>
      <div v-if="event" class="container flex-col">
        <RegistrationsList :selectedParticipant="selectedParticipant" v-on:participantSelected="selectParticipant" />
        <v-btn color="primary" @click="newRegistration">New Registration</v-btn>
        <v-overlay opacity="0.90" :value="selectedParticipant">
            <AddEditParticipant :selectedParticipant="selectedParticipant" :eventId="event.eventId" :levels="event.levels" v-on:close="closeModal"/>
        </v-overlay>
      </div>
      <div v-else>
        <h3>Please select an event first</h3>
        <EventSelector />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { IParticipant } from '../data/interfaces';
import EventSelector from '@/components/EventSelector.vue'; // @ is an alias to /src;
import RegistrationsList from '@/components/RegistrationsList.vue'; // @ is an alias to /src;
import AddEditParticipant from '@/components/AddEditParticipant.vue'; // @ is an alias to /src;
import { mapState } from 'vuex';
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
        bib: 0,
        finalLevel: '',
        originalLevel: '',
        id: uuid(),
        role: '',
      };
    }
}
</script>
