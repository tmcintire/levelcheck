import { firebaseRef } from '../firebase';
import { firestore } from 'firebase-admin';
import * as _ from 'lodash';
import { v4 as uuid } from 'uuid';
import { store } from '@/store';
import { IEvent, IParticipant, ILevel, TVP, IUser } from './interfaces';
import { __values } from 'tslib';

/** Takes in an eventId and sets that events details to the main state active event */
export const setEventDetails = async (eventId: string) => {
    if (eventId) {
        firebaseRef.collection('events').doc(eventId).onSnapshot((snapshot) => {
            const event = snapshot.data() as IEvent;

            if (event) {
                console.log(`Event "${event.name}" has been updated`, event);
                event.eventId = eventId;
                store.dispatch('setEvent', event);
            }
        });
    } else {
        store.dispatch('setEvent', null);
    }
};

export const setSelectedEventDetails = (eventId: string) => {
    if (eventId) {
        firebaseRef.collection('events').doc(eventId).onSnapshot((snapshot) => {
            const event = snapshot.data() as IEvent;

            if (event) {
                event.eventId = eventId;
                event.newEvent = false;
                store.dispatch('setSelectedEvent', event);
            }
        });
    } else {
        store.dispatch('setSelectedEvent', null);
    }
};

/** Fetch all of the users events and set them to a selection box for them to select the active event */
export const getUserEvents = (userId: string) => {
    firebaseRef.collection('users').doc(userId).onSnapshot((snapshot) => {
        const fbUser: IUser = snapshot.data() as IUser;
        if (fbUser.events) {
            console.log('Fetched users events', fbUser.events);

            const userEvents: TVP[] = [];

            _.forEach(fbUser.events, (ev, id) => {
                eventDetails(id).then((event: IEvent) => {
                    userEvents.push({
                        text: event.name,
                        value: id,
                    });

                    if (userEvents.length === Object.keys(fbUser.events).length) {
                        store.dispatch('setUserEvents', userEvents);
                    }
                });
            });
        }
      });
};

export const eventDetails = (eventId: string): Promise<IEvent> => new Promise((resolve, reject) => {
    firebaseRef.collection('events').doc(eventId).get().then((snapshot) => {
        const event = snapshot.data() as IEvent;

        if (event) {
            console.log('Found event', event);
            resolve(event);
        } else {
            reject('No Event found');
        }
    });
});

// tslint:disable-next-line: max-line-length
export const addParticipant = (eventId: string, participant: IParticipant, nextNumber: number) => new Promise((resolve, reject) => {
    // tslint:disable-next-line: max-line-length
    firebaseRef.collection('events').doc(eventId).set({participants: {[nextNumber]: participant}}, {merge: true}).then(() => {
        resolve();
    });
});

export const addEditLevel = (eventId: string, level: ILevel, levelId?: string) => {
    if (level) {
        firebaseRef.collection('events').doc(eventId).set({
            levels: {
                [levelId ? levelId : uuid()]: level,
            },
        }, { merge: true });
    } else {
        const updates: any = {};
        updates[`levels.${levelId}`] = firestore.FieldValue.delete();
        console.log(updates);
        firebaseRef.collection('events').doc(eventId).update(updates);
    }

};

export const addEditParticipant = (eventId: string, participant: IParticipant, participantId?: string) => {
    firebaseRef.collection('events').doc(eventId).set({
        participants: {
            [participantId ? participantId : uuid()]: participant,
        },
    }, { merge: true });
};

export const skipTutorial = (tutorialValue: string, value: boolean) => new Promise((resolve, reject) => {
    const userid = store.getters.user.id;
    console.log(store.getters.user);
    if (userid) {
        firebaseRef.collection('users').doc(userid).update({
           [tutorialValue]: value,
        }).then(() => resolve());
    }
});

export const addEditEvent = (event: IEvent) => new Promise((resolve, reject) => {
    if (store.getters.selectedEvent.newEvent) {
        // This is a new event
        const newId = uuid();
        firebaseRef.collection('events').doc(newId).set(event).then(() => {
            const userid = store.getters.user.id;
            firebaseRef.collection('users').doc(userid).set({
                events: {
                    [newId]: true,
                },
            }, {merge: true}).then(() => resolve());
        });
    } else {
        firebaseRef.collection('events').doc(event.eventId).set(event, {merge: true}).then(() => {
            resolve();
        });
    }
});


