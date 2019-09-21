import Vue from 'vue';
import Vuex, { Store } from 'vuex';
import { IRegistration, IUser } from './data/interfaces';
import * as registrations from './registrations.json';
import { getLevelsFromRegistrations } from './helpers';

Vue.use(Vuex);

export interface IRegistrationState {
  registrations: IRegistration[];
  levels: string[];
  user: IUser;
}

// fetch('/api/registrations').then((res) => {
//   return res.json();

//   // get the unique levels from the data we have been provided, we'll use this to ask the
//   // administrator which levels need checks const levels = getLevelsFromRegistrations(res.json);
// }).then((registrations) => {
//   store.dispatch('create', registrations);

//   // create the levels
//   const levels = getLevelsFromRegistrations(registrations);
//   store.dispatch('createLevels', levels);
// });

export const store = new Vuex.Store<IRegistrationState>({
  state: {
    registrations: [],
    levels: [],
    user: null,
  },
  mutations: {
    add(state, payload) {
      state.registrations = state.registrations.concat(payload);
    },
    create(state, payload) {
      state.registrations = payload;
    },
    createLevels(state, payload) {
      state.levels = payload;
    },
    setUser(state, payload) {
      state.user = payload;
    },
    logout(state) {
      state.user = null;
    },
  },
  actions: {
    add(context, payload) {
      context.commit('add', payload);
    },
    create(context, payload) {
      context.commit('create', payload);
    },
    createLevels(context, payload) {
      context.commit('createLevels', payload);
    },
    setUser(context, payload) {
      context.commit('setUser', payload);
    },
    logout(context) {
      context.commit('logout');
    },
  },
});
