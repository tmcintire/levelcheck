import * as firebase from 'firebase';


try {
  const firebaseConfig = {
    apiKey: 'AIzaSyCl50wPdt4leQ6-siEr5LSTQlwNF3NG55U',
    authDomain: 'levelcheck-d8eff.firebaseapp.com',
    databaseURL: 'https://levelcheck-d8eff.firebaseio.com',
    projectId: 'levelcheck-d8eff',
    storageBucket: 'levelcheck-d8eff.appspot.com',
    messagingSenderId: '84900302229',
    appId: '1:84900302229:web:9917ac5c6c00601f823a9c',
  };
  console.log('Initializing Firebase');
  firebase.initializeApp(firebaseConfig);
  // firebase.initializeApp({
  //   databaseURL: `ws://localhost:5000`,
  // });
} catch (e) {
  console.log(e);
}


export const firebaseRef = firebase.firestore();
export default firebase;
