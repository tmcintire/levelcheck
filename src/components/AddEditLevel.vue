<template>
     <transition name="modal">
        <div class="modal-mask">
        <div class="modal-wrapper">
            <div class="modal-container">
            <div class="modal-header flex-row flex-align-center">
                <slot name="header">
                Add/Edit Level
                </slot>
                <b-button variant="danger" @click="$emit('close')">X</b-button>
            </div>

            <div class="modal-body">
                <slot name="body">
                   <b-form @submit="onSubmit" @reset="onReset">
                        <b-form-group label="Level name">
                            <b-form-input class="form-input" v-model="name" placeholder="Name"></b-form-input>
                        </b-form-group>
                        <b-form-group label="This level requires a level check">
                            <b-form-checkbox class="form-input" v-model="levelCheck"></b-form-checkbox>
                        </b-form-group>

                        <b-button type="submit" variant="primary">Submit</b-button>
                        <b-button type="reset" variant="danger">Reset</b-button>
                        <b-button variant="danger" @click="onDelete">Delete</b-button>
                    </b-form>
                </slot>
            </div>
            </div>
        </div>
        </div>
    </transition>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import * as _ from 'lodash';
import { ILevel } from '../data/interfaces';
import { addEditLevel, addEditParticipant } from '../data/api';

@Component
export default class AddEditLevel extends Vue {
    @Prop() public selectedLevel: ILevel;
    @Prop() public eventId: string;

    public name: string = '';
    public levelCheck: boolean = false;
    public id: string = '';

    public onSubmit(e: Event) {
        e.preventDefault();

        const level: ILevel = {
            name: this.name,
            levelCheck: this.levelCheck,
        };
        this.$emit('close');

        addEditLevel(this.eventId, level, this.id);
    }

    public onDelete(e: Event) {
        e.preventDefault();

        addEditLevel(this.eventId, null, this.id);
    }

    public onReset() {
        this.name = '';
        this.levelCheck = false;
        this.id = '';
    }

    @Watch('selectedLevel', { immediate: true })
    private levelChanged(level: ILevel) {
        if (level) {
            this.name = level.name;
            this.levelCheck = level.levelCheck;
            this.id = level.id;
        }
    }
}
</script>
