<template>
    <v-overlay opacity="0.90" :value="selectedParticipant">
        <v-item-group v-if="selectedParticipant">
            <v-container>
                <h2>{{selectedParticipant.name}}</h2>
                <h3>Select a new track</h3>
                <v-row>
                    <v-col
                    v-for="level in levels"
                    :key="level.name"
                    >
                        <v-item v-slot:default="{ active, toggle }">
                            <v-card
                            :color="active ? 'primary' : ''"
                            class="d-flex flex-center"
                            dark
                            height="50"
                            width="100"
                            @click="handleToggle(toggle, level.name)"
                            >
                                {{level.name}}
                                <v-scroll-y-transition>
                                    <div
                                    v-if="active"
                                    >
                                    </div>
                                </v-scroll-y-transition>
                            </v-card>
                        </v-item>
                    </v-col>
                </v-row>
            </v-container>
        </v-item-group>
        <h1 @click="$emit('setParticipant', null)">Close</h1>
    </v-overlay>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { IParticipant, ILevel, IChanges } from '@/data/interfaces';
import { addEditParticipant, fireUndoNotification } from '../../data/api';
import { store } from '../../store';

@Component
export default class ChangeLevel extends Vue {
    @Prop() private selectedParticipant: IParticipant;
    @Prop() private levels: ILevel;

    private handleToggle(toggle: () => void, newLevel: string) {
        toggle();
        
        fireUndoNotification(this.selectedParticipant);
        const participant = {
            ...this.selectedParticipant,
            finalLevel: newLevel,
            levelChecked: true,
        }

        addEditParticipant(participant, this.selectedParticipant.id);
        this.$emit('setParticipant', null);
    }
}
</script>

<style lang="less" scoped>
    
</style>