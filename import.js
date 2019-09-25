// Imports
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

const firestoreService = require('firestore-export-import');
const serviceAccount = require('./serviceAccount.json');

// JSON To Firestore
const jsonToFirestore = async () => {
  try {
    console.log('Initialzing Firebase');
    await firestoreService.initializeApp(serviceAccount, firebaseConfig.databaseURL);
    console.log('Firebase Initialized');

    await firestoreService.restore('./starter.json');
    console.log('Upload Success');
  }
  catch (error) {
    console.log(error);
  }
};

jsonToFirestore();