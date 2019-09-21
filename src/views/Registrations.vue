<template>
  <div class="registrations">
    <h1>Registrations</h1>
    <div class="flex-row flex-space-around">
      <div class="flex-col">
        <b-form @submit="onSubmit" @reset="onReset">
          <b-form-input class="form-input" v-model="firstName" placeholder="First Name"></b-form-input>
          <b-form-input class="form-input" v-model="lastName" placeholder="Last Name"></b-form-input>
          <b-form-input class="form-input" v-model="originalLevel" placeholder="Original Level"></b-form-input>
          <b-form-input class="form-input" v-model="finalLevel" placeholder="Final Level"></b-form-input>
          <b-button type="submit" variant="primary">Submit</b-button>
          <b-button type="reset" variant="danger">Reset</b-button>
        </b-form>

        <div v-if="showSuccess">
          <h4>Success!</h4>
        </div>
      </div>
      <div class="flex-col">
        <h4>This is the current vuex store for "registrations":</h4>
        <div class="flex-row" v-for="(registration, index) in registrations" :key="index">
          <span>
            {{registration.FirstName}} {{registration.LastName}} ({{registration.ID}}) - {{registration.OriginalLevel}} 
            <span v-if="registration.FinalLevel">- {{registration.FinalLevel}}</span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { store } from '../store';
import { IRegistration } from '../data/interfaces';
import { mapState } from 'vuex';
import { getNextId } from '../helpers';

@Component({
  computed: mapState(['registrations']),
})
export default class Registrations extends Vue {

  public firstName: string = '';
  public lastName: string = '';
  public originalLevel: string = '';
  public finalLevel: string = '';
  public showSuccess: boolean = false;
  public registrations!: IRegistration[];

  /* Create a new registration and submit it to the store and database */
  public onSubmit(e: Event) {
    e.preventDefault();
    const reg: IRegistration = {
      FirstName: this.firstName,
      LastName: this.lastName,
      OriginalLevel: this.originalLevel,
      FinalLevel: this.finalLevel,
      ID: getNextId(this.registrations),
    };
    console.debug('Submitting new registration', reg);

    // Take the newly created registration, and add it to the store
    store.dispatch('add', [reg]).then(() => {
      this.onReset();

      this.showSuccess = true;

      setTimeout(() => {
        this.showSuccess = false;
      }, 2000);
    });
  }

  public onReset() {
    this.firstName = '';
    this.lastName = '';
    this.originalLevel = '';
    this.finalLevel = '';
  }
}
</script>
