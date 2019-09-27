<template>
  <div v-if="participants" class="registrations">
        <div 
            class="flex-row hover" 
            v-for="(participant, key) in participants" 
            :key="key" 
            @click="$emit('participantSelected', {participant, id: index})"
            :class="selectedParticipant && selectedParticipant.id === participant.id ? 'active' : ''"
            >
            <span>
            {{participant.name}} {{participant.bib}} - {{participant.originalLevel}} 
            <span v-if="participant.finalLevel">- {{participant.finalLevel}}</span>
            </span>
        </div>
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
        participants: (state: IParticipantState) => {
            const participants = state.event.participants;
            _.forEach(participants, (p: any, key: any) => {
                p.id = key;
            });

            return participants;
        },
    }),
})
export default class RegistrationsList extends Vue {
    @Prop() public selectedParticipant: IParticipant;
}
</script>
