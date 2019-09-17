import Vue from 'vue';
import Vuex from 'vuex';
import { IRegistration } from './data/interfaces';
import { registrations } from './registrations';
import { getLevelsFromRegistrations } from './helpers';

Vue.use(Vuex);

export interface IRegistrationState {
  registrations: IRegistration[];
  levels: string[];
}

fetch("http://localhost:3000/users").then(res => {
  console.log(res);
});

// get the unique levels from the data we have been provided, we'll use this to ask the administrator which levels need checks
const levels = getLevelsFromRegistrations(registrations);

export default new Vuex.Store<IRegistrationState>({
  state: {
    registrations,
    levels
  },
  mutations: {
    add(state, payload) {
      state.registrations = state.registrations.concat(payload);
    },
  },
  actions: {
    add(context, payload) {
      context.commit('add', payload);
    },
  },
});
