import Vue from 'vue';
import Vuex from 'vuex';
import { IRegistration } from './data/interfaces';

Vue.use(Vuex);

export interface IRegistrationState {
  registrations: IRegistration[];
}

export default new Vuex.Store<IRegistrationState>({
  state: {
    registrations: [
      {
        FirstName: 'Tim',
        LastName: 'McIntire',
        OriginalLevel: 'Skylab',
        FinalLevel: 'Skylab',
      },
    ],
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
