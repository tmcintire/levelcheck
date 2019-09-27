import Vue from 'vue';
import Vuex, { Store } from 'vuex';
import {IUser, IEvent, ILevel, TVP, IApplicationState } from './data/interfaces';
import uuid from 'uuid';

Vue.use(Vuex);

export const store = new Vuex.Store<IApplicationState>({
  state: {
    registrations: [],
    levels: [],
    user: null,
    event: null,
    userEvents: null,
    selectedEvent: null,
    levelCheckLevel: '',
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
    setUserEvents(state, payload: TVP[]) {
      // need a blank value
      state.userEvents = payload;
    },
    updateSelectedEvent(state, payload: {property: any, field: any, value: any, key?: any}) {
      if (payload.key) {
        state.selectedEvent[payload.property][payload.key][payload.field] = payload.value;
      } else {
        state.selectedEvent[payload.property] = payload.value;
      }
    },
    setSelectedEvent(state, payload: IEvent) {
      state.selectedEvent = payload;
    },
    addNewLevel(state) {
      const levelId = uuid();
      state.selectedEvent.levels = { ...state.selectedEvent.levels,
        [levelId]: {
          name: '',
          levelCheck: false,
          order: Object.keys(state.selectedEvent.levels).length,
      }};
    },
    setLevelCheckLevel(state, payload) {
      state.levelCheckLevel = payload;
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
    setUserEvents(context, payload: TVP[]) {
      context.commit('setUserEvents', payload);
    },
    updateSelectedEvent(context, payload) {
      context.commit('updateSelectedEvent', payload);
    },
    setSelectedEvent(context, payload: IEvent) {
      context.commit('setSelectedEvent', payload);
    },
    addNewLevel(context, payload: ILevel) {
      context.commit('addNewLevel');
    },
    setLevelCheckLevel(context, payload) {
      context.commit('setLevelCheckLevel', payload);
    },
  },
  getters: {
    user: (state: IApplicationState): IUser => {
      return state.user;
    },
    selectedEvent: (state: IApplicationState): IEvent => {
      return state.selectedEvent;
    },
  },
});
