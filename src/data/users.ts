import firebase, { firebaseRef } from '../firebase';
import { store } from '@/store';
import { IUser } from './interfaces';

/** Fetch the user permissions for a given userID and set it to the store */
export const getUserPermissions = (user: firebase.User) => new Promise((resolve, reject) => {
  firebaseRef.child('users').child(user.uid).once('value').then((snapshot) => {
    console.log('New Logged In User', snapshot.val());
    const fbUser = snapshot.val();
    const u: IUser = {
      name: fbUser.name,
      role: '',
      levelCheckTutorial: fbUser.levelCheckTutorial,
      adminTutorial: fbUser.adminTutorial,
      events: fbUser.events,
      id: user.uid,
    };

    if (user) {
      firebaseRef.child('roles').child(fbUser.roleKey).once('value').then((role) => {
        u.role = role.val().role;
        store.dispatch('setUser', u).then(() => {
          document.cookie = `refreshToken=${user.refreshToken}`;
          document.cookie = `user=${u.name}`;
          document.cookie = `role=${u.role}`;
          resolve();
        });
      });
    }
  });
});
