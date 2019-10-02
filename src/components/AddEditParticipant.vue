<template>
    <v-container>
        <v-row justify="space-between" align="center">
            <h3 class="header">Add/Edit Registration</h3>
             <v-btn color="error" @click="$emit('close')">X</v-btn>
        </v-row>
        <v-form @submit="onSubmit" @reset="onReset">
            <v-text-field :label="'Name'" v-model="name"></v-text-field>
            <v-text-field :label="'Bib Number'" v-model="bib"></v-text-field>
            <v-text-field :label="'Role'" v-model="role"></v-text-field>
            <v-select :label="'Level'" v-model="originalLevel" outlined :items="levelOptions"></v-select>

            <div class="flex-row flex-space-between">
                <v-btn type="submit" color="primary">Submit</v-btn>
                <v-btn type="reset" color="error">Reset</v-btn>
            </div>
        </v-form>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import * as _ from 'lodash';
import { IParticipant, ILevel, IEventLevels } from '../data/interfaces';
import { addEditParticipant } from '../data/api';

@Component
export default class AddEditLevel extends Vue {
    @Prop() public selectedParticipant: IParticipant;
    @Prop() public levels: ILevel;

    public name: string = '';
    public bib: string = '';
    public id: string = '';
    public originalLevel: string = '';
    public finalLevel: string = '';
    public role: string = '';
    public showSuccess: boolean = false;
    public registrations!: IParticipant[];
    public levelOptions: string[] = [];

    public onReset() {
        this.name = '';
        this.bib = '';
        this.originalLevel = '';
        this.finalLevel = '';
        this.id = '';
    }


    public onSubmit(e: Event) {
        e.preventDefault();
        const participant: IParticipant = {
            name: this.name,
            bib: parseInt(this.bib, 10),
            originalLevel: this.originalLevel,
            finalLevel: this.originalLevel,
            role: this.role,
        };

        this.$emit('close');

        addEditParticipant(participant, this.id as any);
    }

    @Watch('selectedParticipant', { immediate: true })
    private participantChanged(participant: IParticipant) {
        if (participant) {
            this.name = participant.name;
            this.bib = participant.bib as any;
            this.originalLevel = participant.originalLevel;
            this.finalLevel = participant.finalLevel;
            this.id = participant.id;
        }
    }

    @Watch('levels', { immediate: true })
    private compileLevels(levels: IEventLevels) {
        this.levelOptions = Object.keys(levels).map((key) => levels[key].name);
    }
}
</script>
