import Vue from 'vue';
import Vuex, { Store } from 'vuex';
import { IParticipant, IUser, IEvent, IUserEvent } from './data/interfaces';
import * as registrations from './registrations.json';
import { getLevelsFromRegistrations } from './helpers';

Vue.use(Vuex);

export interface IParticipantState {
  registrations: IParticipant[];
  levels: string[];
  user: IUser;
  event: IEvent;
  userEvents: IUserEvent[];
}

export const store = new Vuex.Store<IParticipantState>({
  state: {
    registrations: [],
    levels: [],
    user: null,
    event: null,
    userEvents: null,
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
    setEvent(state, payload) {
      state.event = payload;
    },
    setUserEvents(state, payload) {
      state.userEvents = payload;
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
    setEvent(context, payload) {
      context.commit('setEvent', payload);
    },
    setUserEvents(context, payload) {
      context.commit('setUserEvents', payload);
    },
  },
  getters: {
    user: (state: IParticipantState): IUser => {
      return state.user;
    },
  },
});
