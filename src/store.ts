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
    levelCheckLevel: null,
    levelCheckRole: null,
    undoChangeState: [],
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
    updateSelectedEvent(state, payload: {property: any, value: any, type?: string, field?: any, key?: any}) {
      if (payload.type === 'number') {
        payload.value = parseInt(payload.value, 10);
      }

      if (payload.key && payload.field) {
        // This is a nested collection with key value pairs
        state.selectedEvent[payload.property][payload.key][payload.field] = payload.value;
      } else if (payload.field && !payload.key) {
        // This is just a field, inside of a field, lets update it
        state.selectedEvent[payload.property][payload.field] = payload.value;
      } else {
        // A single nested field on the event
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
    setLevelCheckRole(state, payload) {
      state.levelCheckRole = payload;
    },
    addChange(state, payload) {
      state.undoChangeState.push(payload);
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
    setLevelCheckRole(context, payload) {
      context.commit('setLevelCheckRole', payload);
    },
    addChange(context, payload) {
      context.commit('addChange', payload);
    },
  },
  getters: {
    user: (state: IApplicationState): IUser => {
      return state.user;
    },
    selectedEvent: (state: IApplicationState): IEvent => {
      return state.selectedEvent;
    },
    event: (state: IApplicationState): IEvent => {
      return state.event;
    },
  },
});
