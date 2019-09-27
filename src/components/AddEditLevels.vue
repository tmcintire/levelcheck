<template>
    <div>
        <div 
            v-for="level in levels"
            :key="level.id" 
            @click="selectLevel(level, level.id)"
            class="flex-row hover"
            :class="selectedLevel === level ? 'active' : ''">
            {{level.name}} - {{level.levelCheck ? "Level Check" : "No Level Check"}}
        </div>
        <b-button type="submit" variant="primary" @click="newLevel">New Level</b-button>
        <v-overlay opacity="0.90" :value="selectedLevel">
            <AddEditLevel :selectedLevel="selectedLevel" :selectedLevelId="selectedLevelId" :eventId="eventId" :levels="levels" v-on:close="onClose"/>
        </v-overlay>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { ILevel } from '../data/interfaces';
import AddEditLevel from '@/components/AddEditLevel.vue'; // @ is an alias to /src;
import { mapState } from 'vuex';
import { v4 as uuid } from 'uuid';
import { IParticipantState } from '../store';

@Component({
    components: {
        AddEditLevel,
    },
    computed: mapState({
        levels: (state: IParticipantState) => {
            return Object.entries(state.event.levels).map((level: [string, ILevel]) => {
                return {...level[1], id: level[0]};
            }).sort((a, b) => a.order - b.order);

        },
        eventId: (state: IParticipantState) => state.event.eventId,
    }),
})
export default class AddEditParticipant extends Vue {
    @Prop() public levels: ILevel;

    public selectedLevel: ILevel = null;
    public selectedLevelId: string = null;

    public selectLevel(level: ILevel, key: string) {
        this.selectedLevel = level;
        this.selectedLevelId = key;
    }

    /** Create a blank level and set its order to the number of levels we currently have */
    public newLevel() {


        this.selectedLevel = {
            name: '',
            levelCheck: false,
            order: Object.keys(this.levels).length,
        };
        this.selectedLevelId = uuid();
    }

    public onClose() {
        this.selectedLevel = null;
        this.selectedLevelId = null;
    }
}
</script>
