<template>
    <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header flex-row flex-align-center">
            <slot name="header">
              Add/Edit Registration
            </slot>
             <b-button variant="danger" @click="$emit('close')">X</b-button>
          </div>

          <div class="modal-body">
            <slot name="body">
              <b-form @submit="onSubmit" @reset="onReset">
                <b-form-input class="form-input" v-model="name" placeholder="Name"></b-form-input>
                <b-form-input type="number" class="form-input" v-model="bib" placeholder="Bib Number"></b-form-input>
                <b-form-input class="form-input" v-model="originalLevel" placeholder="Original Level"></b-form-input>
                <b-form-input class="form-input" v-model="finalLevel" placeholder="Final Level"></b-form-input>

                <b-button type="submit" variant="primary">Submit</b-button>
                <b-button type="reset" variant="danger">Reset</b-button>
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
import { IParticipant } from '../data/interfaces';
import { addEditParticipant } from '../data/api';

@Component
export default class AddEditLevel extends Vue {
    @Prop() public selectedParticipant: IParticipant;
    @Prop() public eventId: string;

    public name: string = '';
    public bib: string = '';
    public id: number = 0;
    public originalLevel: string = '';
    public finalLevel: string = '';
    public showSuccess: boolean = false;
    public registrations!: IParticipant[];


    public onReset() {
        this.name = '';
        this.bib = '';
        this.originalLevel = '';
        this.finalLevel = '';
        this.id = 0;
    }


    public onSubmit(e: Event) {
        e.preventDefault();
        const participant: IParticipant = {
            name: this.name,
            bib: parseInt(this.bib, 10),
            originalLevel: this.originalLevel,
            finalLevel: this.finalLevel,
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
}
</script>
