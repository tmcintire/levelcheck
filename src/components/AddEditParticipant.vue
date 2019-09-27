<template>
    <div class="overlay">
        <div class="modal-header flex-row flex-align-center">
            <span class="header">
              Add/Edit Registration
            </span>
             <v-btn color="error" @click="$emit('close')">X</v-btn>
        </div>
        <b-form @submit="onSubmit" @reset="onReset">
            <b-form-input class="form-input" v-model="name" placeholder="Name"></b-form-input>
            <b-form-input type="number" class="form-input" v-model="bib" placeholder="Bib Number"></b-form-input>
            <b-form-input type="number" class="form-input" v-model="role" placeholder="Bib Number"></b-form-input>
            <b-form-select class="form-input" v-model="originalLevel" :options="levelOptions"></b-form-select>
            <b-form-select class="form-input" v-model="finalLevel" :options="levelOptions"></b-form-select>

            <div class="flex-row flex-space-between">
                <v-btn type="submit" color="primary">Submit</v-btn>
                <v-btn type="reset" color="error">Reset</v-btn>
            </div>
        </b-form>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import * as _ from 'lodash';
import { IParticipant, ILevel, IEventLevels } from '../data/interfaces';
import { addEditParticipant } from '../data/api';

@Component
export default class AddEditLevel extends Vue {
    @Prop() public selectedParticipant: IParticipant;
    @Prop() public eventId: string;
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
            finalLevel: this.finalLevel,
            role: this.role,
        };

        this.$emit('close');

        addEditParticipant(this.eventId, participant, this.id as any);
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
