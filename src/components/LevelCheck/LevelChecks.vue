<template>
    <div>
        <v-container>
            <v-row dense>
                <v-col>
                    <router-link to="/levelcheck/changes">Undo Changes</router-link>
                    <LevelCheckSelectors 
                        :levels="filteredLevels" 
                        :roles="roles"
                    />

                    <v-row v-if="filteredParticipants && filteredParticipants.length > 0" class="level-check-container">
                        <NumbersBar
                            v-if="filteredParticipants.length > 5"
                            :filteredParticipants="filteredParticipants"
                        />
                        <LevelCheckList
                            v-on:setParticipant="setParticipant"
                            v-on:confirmLevel="confirmLevel"
                            :filteredParticipants="filteredParticipants"
                        />
                    </v-row>
                     <v-row v-else-if="!levelCheckLevel && levelCheckRole" class="pt-12" justify="center" align="center">
                        <h3>Please select a level</h3>
                    </v-row>
                    <v-row v-else-if="levelCheckLevel && !levelCheckRole" class="pt-12" justify="center" align="center">
                        <h3>Please select a role</h3>
                    </v-row>
                    <v-row v-else-if="!filteredParticipants" class="pt-12" justify="center" align="center">
                        <h3>Please select the level and role you are checking</h3>
                    </v-row>                   
                    <v-row v-else class="pt-12" justify="center" align="center">
                        <h3>There are no participants in this level check, please select another level or role</h3>
                    </v-row>
                </v-col>
            </v-row>
        </v-container>
        
        <ChangeLevel
            :selectedParticipant="selectedParticipant"
            :levels="allLevels"
            v-on:setParticipant="setParticipant"
        />

        <!-- Toast for undo notifications -->
        <v-snackbar v-for="(change, index) in tempUndoChangeState" :key="index" color="cyan darken-2" v-model="change.showChange">
            Undo change to {{change.oldValue.name}}
            <v-btn text @click="undoChange(change, index)" >
                Undo
            </v-btn>
        </v-snackbar>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import * as _ from 'lodash';
import { IParticipant, IApplicationState, IChanges, ILevel } from '@/data/interfaces';
import ChangeLevel from '@/components/LevelCheck/ChangeLevel.vue';
import LevelCheckSelectors from '@/components/LevelCheck/LevelCheckSelectors.vue';
import LevelCheckList from '@/components/LevelCheck/LevelCheckList.vue';
import NumbersBar from '@/components/LevelCheck/NumbersBar.vue';
import { mapState } from 'vuex';
import { sortlevels } from '../../helpers';
import { addEditParticipant, fireUndoNotification } from '../../data/api';

@Component({
    components: {
        ChangeLevel,
        LevelCheckSelectors,
        LevelCheckList,
        NumbersBar,
    },
    computed: mapState({
        filteredParticipants: (state: IApplicationState) => {
            if (state.levelCheckLevel) {
                // Filter participants by their selected level
                const participantArray = Object.entries(state.event.participants);
                const filteredArray: IParticipant[] = participantArray.filter(p => {
                    const part = p[1] as IParticipant;
                    part.id = p[0];
                    return (
                        part.originalLevel === state.levelCheckLevel.name &&
                        part.role === state.levelCheckRole &&
                        !part.levelChecked
                    );
                }).map(p => p[1]);

                const sortedFilteredArray = filteredArray.sort((a, b) => a.bib - b.bib);

                return sortedFilteredArray;
            }
        },
        filteredLevels: (state: IApplicationState) => {
            const filteredLevels =  Object.entries(state.event.levels).filter((level: [string, ILevel]) => {
                return level[1].levelCheck;
            }).map(l => l[1]);

            return sortlevels(filteredLevels);
        },
        roles: (state: IApplicationState) => {
            const allRoles = Object.entries(state.event.participants).map(p => p[1].role);
            const uniqueRoles = _.uniq(allRoles);
            return uniqueRoles;
        },
        undoChangeState: (state: IApplicationState) => state.undoChangeState,
        allLevels: (state: IApplicationState) => state.event.levels,
        levelCheckLevel: (state: IApplicationState) => state.levelCheckLevel,
        levelCheckRole: (state: IApplicationState) => state.levelCheckRole,
        
    }),
})
export default class LevelChecks extends Vue {
    private tempUndoChangeState: IChanges[] = [];
    private selectedParticipant: IParticipant = null;
    private showUndo: boolean = false;

    private mounted() {
        this.resizeView();
        window.addEventListener('resize', this.resizeView);
    }

    // Handle the resizing of the list element so it always fits on the page
    private resizeView() {
        const el = document.getElementsByClassName('tabs-container');
        if (el[0]) {
            const rect  = el[0].getBoundingClientRect();
            const levelContainer = document.getElementsByClassName('level-check-container');
            if (levelContainer[0]) {
                const cont: HTMLElement = levelContainer[0] as HTMLElement;
                cont.style.height = window.innerHeight - 40 - rect.bottom + 'px';
            }
        }
    }

    private undoChange(change: IChanges, index: number) {
        this.tempUndoChangeState.splice(index, 1);
 
        addEditParticipant(change.oldValue, change.id);
    }

    private setParticipant(value: IParticipant) {
        this.selectedParticipant = value;
    }

    private confirmLevel(participant: IParticipant) {
        const change: IChanges = {
            oldValue: participant,
            id: participant.id,
            field: 'participants',
            showChange: true,
        };
        this.tempUndoChangeState.push(change);
        const index = this.tempUndoChangeState.length - 1;

        // After 5 seconds, remove the toast to undo the change, after this the user will have to go to
        // the changes page to undo this change
        setTimeout(() => {
            this.tempUndoChangeState.splice(index, 1);
        }, 5000);

        fireUndoNotification(participant);
        participant = {
            ...participant,
            levelChecked: true,
        };
        addEditParticipant(participant, participant.id);
    }
}
</script>

<style lang="less">
    .main-wrapper {
        height: calc(~"100vh - 100px");
        position: relative;
    }

    .level-check-container {
        border: 1px solid silver;
        border-radius: 5px;
        box-shadow: 3px 0px 4px silver;
        padding: 2px 0px;
        height: calc(~"100vh - 340px");
        margin-top: 15px;
    }
</style>