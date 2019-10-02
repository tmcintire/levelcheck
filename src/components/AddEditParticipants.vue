<template>
  <div>
    <RegistrationsList 
      :selectedParticipant="selectedParticipant" 
      @participantSelected="selectParticipant" 
    />
    <v-btn color="primary" @click="newRegistration">New Registration</v-btn>
    <v-dialog 
      v-if="selectedParticipant" 
      width="600px"
      max-width="700px"
      :value="selectedParticipant"
      content-class="dialog-modal"
    >
          <AddEditParticipant 
          :selectedParticipant="selectedParticipant"
          :levels="event.levels" 
          @close="closeModal"
        />
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { IParticipant } from '../data/interfaces';
import EventSelector from '@/components/EventSelector.vue'; // @ is an alias to /src;
import RegistrationsList from '@/components/RegistrationsList.vue'; // @ is an alias to /src;
import AddEditParticipant from '@/components/AddEditParticipant.vue'; // @ is an alias to /src;
import { mapState } from 'vuex';

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
        role: '',
      };
    }
}
</script>
