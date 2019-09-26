<template>
    <div>
        <div 
            v-for="(level, key) in levels"
            :key="key" 
            @click="selectLevel(level, key)"
            class="flex-row hover"
            :class="selectedLevel === level ? 'active' : ''">
            {{level.name}} - {{level.levelCheck ? "Level Check" : "No Level Check"}}
        </div>
        <b-button type="submit" variant="primary" @click="newLevel">New Level</b-button>
        <v-overlay opacity="0.90" :value="selectedLevel">
            <AddEditLevel :selectedLevel="selectedLevel" :eventId="eventId" v-on:close="onClose"/>
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
        levels: (state: IParticipantState) => state.event.levels,
        eventId: (state: IParticipantState) => state.event.eventId,
    }),
})
export default class AddEditParticipant extends Vue {
    public selectedLevel: ILevel = null;

    public selectLevel(level: ILevel, key: string) {
        this.selectedLevel = level;
    }

    public newLevel() {
        const id = uuid();
        this.selectedLevel = {
            name: '',
            levelCheck: false,
            id,
        };
    }

    public onClose() {
        this.selectedLevel = null;
    }
}
</script>