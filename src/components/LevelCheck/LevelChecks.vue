<template>
    <div class="level-checks flex-grow">
        <v-card 
            class="mx-auto participant-card"
            :id="`lc-${participant.bib}`"
            v-for="participant in filteredParticipants"
            :key="participant.id"
        >
            <div class="flex-row">
                <div class="card-left" @click="selectedParticipant = participant">
                    <v-card-text class="card-bib">{{participant.bib}}</v-card-text>
                </div>
                <div class="card-right flex-grow" @click="selectedParticipant = participant">
                    <v-card-text>Name: {{participant.name}}</v-card-text>
                    <v-card-text>Level: {{participant.originalLevel}}</v-card-text>
                </div>
                <div class="confirm-level flex-row flex-center" @click="confirmLevel(participant)">
                    <v-icon color="success" x-large>mdi-check-bold</v-icon>
                </div>
            </div>
        </v-card>

        <ChangeLevel 
            :selectedParticipant="selectedParticipant" 
            :levels="levels"
            v-on:setParticipant="setParticipant"
        />
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { IParticipant, IApplicationState } from '@/data/interfaces';
import ChangeLevel from '@/components/LevelCheck/ChangeLevel.vue';
import { mapState } from 'vuex';
import { sortlevels } from '../../helpers';
import { addEditParticipant, fireUndoNotification } from '../../data/api';

@Component({
    components: {
        ChangeLevel,
    },
    computed: mapState({
        levels: (state: IApplicationState) => sortlevels(state.event.levels),
    }),
})
export default class LevelChecks extends Vue {
    @Prop() filteredParticipants: IParticipant[];
    private selectedParticipant: IParticipant = null;

    private setParticipant(value: IParticipant) {
        this.selectedParticipant = value;
    }

    private confirmLevel(participant: IParticipant) {
        fireUndoNotification(participant);
        participant = {
            ...participant,
            levelChecked: true,
        }
        addEditParticipant(participant, participant.id);
    }
}
</script>

<style lang="less" scoped>
    .level-checks {
        margin-right: 10px;
        overflow-y: auto;

        .participant-card {
            margin: 10px 0px;

            .confirm-level {
                width: 100px;
            }

            .card-left {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 110px;
                border-right: 1px solid #bebebe;

                .card-bib {
                    font-size: 1.9em;
                }
            }
        }
    }
</style>