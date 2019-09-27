<template>
    <div class="overlay">
        <div class="modal-header flex-row flex-align-center">
            <span class="header">
              Add/Edit Level
            </span>
             <v-btn color="error" @click="$emit('close')">X</v-btn>
        </div>
        <v-form>
            <v-text-field :label="'Name'" v-model="name"></v-text-field>
            <v-checkbox :label="`This level requires a level check`" v-model="levelCheck"></v-checkbox>

            <v-btn @click="onSubmit" type="submit" color="primary">Submit</v-btn>
            <v-btn @click="onReset" type="reset" color="error">Reset</v-btn>
            <v-btn @click="onDelete" color="error">Delete</v-btn>
        </v-form>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import * as _ from 'lodash';
import { ILevel, IEventLevels } from '../data/interfaces';
import { addEditLevel, addEditParticipant } from '../data/api';

@Component
export default class AddEditLevel extends Vue {
    @Prop() public selectedLevel: ILevel;
    @Prop() public selectedLevelId: string;
    @Prop() public eventId: string;
    @Prop() public levels: IEventLevels;

    public name: string = '';
    public levelCheck: boolean = false;
    public order: number = 0;

    public onSubmit(e: Event) {
        e.preventDefault();

        const level: ILevel = {
            name: this.name,
            levelCheck: this.levelCheck,
            order: this.order,
        };
        this.$emit('close');

        addEditLevel(this.eventId, level, this.selectedLevelId);
    }

    public onDelete(e: Event) {
        e.preventDefault();

        addEditLevel(this.eventId, null, this.selectedLevelId);
    }

    public onReset() {
        this.name = '';
        this.levelCheck = false;
    }

    @Watch('selectedLevel', { immediate: true })
    private levelChanged(level: ILevel) {
        if (level) {
            this.name = level.name;
            this.levelCheck = level.levelCheck;
            this.order = level.order;
        }
    }
}
</script>
