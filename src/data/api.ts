import { firebaseRef } from '../firebase';
import { firestore } from 'firebase-admin';
import * as _ from 'lodash';
import { v4 as uuid } from 'uuid';
import { store } from '@/store';
import { IEvent, IParticipant, ILevel, TVP, IUser, IChanges } from './interfaces';
import { __values } from 'tslib';

/** Takes in an eventId and sets that events details to the main state active event */
export const setEventDetails = async (eventId: string) => {
    if (eventId) {
        firebaseRef.child('events').child(eventId).on('value', (snapshot) => {
            const event = snapshot.val() as IEvent;

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
        firebaseRef.child('events').child(eventId).on('value', (snapshot) => {
            const event = snapshot.val() as IEvent;

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
    firebaseRef.child('users').child(userId).on('value', (snapshot) => {
        const fbUser: IUser = snapshot.val() as IUser;
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
    firebaseRef.child('events').child(eventId).on('value', (snapshot) => {
        const event = snapshot.val() as IEvent;

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
    const eventRef = firebaseRef.child('events').child(eventId);
    const key = eventRef.child('participants').push().key;
    firebaseRef.child('events').child(eventId).child('participants').child(key).set(participant).then(() => {
        resolve();
    });
});

export const addEditLevel = (eventId: string, level: ILevel, levelId?: string) => {
    const eventRef = firebaseRef.child('events').child(eventId);
    let key = levelId;

    if (!key) {
        key = eventRef.child('participants').push().key;
    }

    eventRef.child('levels').child(key).set(level);
};

export const addEditParticipant = (participant: IParticipant, participantId?: string) => {
    const eventId = store.getters.event.eventId;
    const eventRef = firebaseRef.child('events').child(eventId);
    let key = participantId;
    if (!key) {
        // New participant
        // Add some default values for a new participant
        participant = {
            ...participant,
            levelChecked: false,
            confirmed: false,
        };
        key = eventRef.child('participants').push().key;
    }

    eventRef.child('participants').child(key).set(participant);
};

export const skipTutorial = (tutorialValue: string, value: boolean) => new Promise((resolve, reject) => {
    const userid = store.getters.user.id;
    console.log(store.getters.user);
    if (userid) {
        firebaseRef.child('users').child(userid).update({
           [tutorialValue]: value,
        }).then(() => resolve());
    }
});

export const addEditEvent = (event: IEvent) => new Promise((resolve, reject) => {
    if (store.getters.selectedEvent.newEvent) {
        // This is a new event
        const key = firebaseRef.child('events').push().key;
        firebaseRef.child('events').child(key).set(event).then(() => {
            const userid = store.getters.user.id;
            firebaseRef.child('users').child(userid).child('events').update({
                [key]: true,
            }).then(() => resolve());
        });
    } else {
        firebaseRef.child('events').child(event.eventId).set(event).then(() => {
            resolve();
        });
    }
});

export const fireUndoNotification = (participant: IParticipant) => {
    const change: IChanges = {
        oldValue: participant,
        id: participant.id,
        field: 'participants',
    };
    store.dispatch('addChange', change);
};



