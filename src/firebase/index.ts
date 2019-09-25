import * as firebase from 'firebase';


try {
  const firebaseConfig = {
    apiKey: 'AIzaSyB0LhcZxqgA6aRPOc_4pyi_N1Nn_1Aljjo',
    authDomain: 'levelcheck-c9625.firebaseapp.com',
    databaseURL: 'https://levelcheck-c9625.firebaseio.com',
    projectId: 'levelcheck-c9625',
    storageBucket: 'levelcheck-c9625.appspot.com',
    messagingSenderId: '748358313520',
    appId: '1:748358313520:web:8459964a2686bc6fd92ff5',
    measurementId: 'G-B5SWPE0JWP',
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
