import firebase, { firebaseRef } from '../firebase';
import { store } from '@/store';
import { IUser } from './interfaces';

/** Fetch the user permissions for a given userID and set it to the store */
export const getUserPermissions = (user: firebase.User) => new Promise((resolve, reject) => {
  firebaseRef.collection('users').doc(user.uid).get().then((snapshot) => {
    console.log('New Logged In User', snapshot.data());
    const fbUser = snapshot.data();
    const u: IUser = {
      name: fbUser.name,
      role: '',
      levelCheckTutorial: fbUser.levelCheckTutorial,
      adminTutorial: fbUser.adminTutorial,
      events: fbUser.events,
      id: user.uid,
    };

    if (user) {
      firebaseRef.collection('roles').doc(fbUser.roleKey).get().then((role) => {
        u.role = role.data().role;
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
