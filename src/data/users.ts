import firebase, { firebaseRef } from '../firebase';
import { store } from '@/store';
import { IUser } from './interfaces';

/** Fetch the user permissions for a given userID and set it to the store */
export const getUserPermissions = (userId: string) => new Promise((resolve) => {
  firebaseRef.collection('users').doc(userId).onSnapshot((snapshot) => {
    console.log('User changed', snapshot.data());
    const fbUser = snapshot.data();
    const user: IUser = {
      name: fbUser.name,
      role: '',
      levelCheckTutorial: fbUser.levelCheckTutorial,
      adminTutorial: fbUser.adminTutorial,
      events: fbUser.events,
      id: userId,
    };

    if (user) {
      firebaseRef.collection('roles').doc(fbUser.roleKey).get().then((role) => {
        user.role = role.data().role;
        store.dispatch('setUser', user).then(() => {
          resolve();
        });
      });
    }
  });
});
