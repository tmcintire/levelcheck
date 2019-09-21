const express = require('express');
const bodyParser = require('body-parser')//add this
const firebase = require('firebase');
const app = express();
const port = 3000;

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

const registrations = require('../registrations');

app.use(bodyParser())//add this before any route or before using req.body

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

app.get('/api/registrations', (req, res) => {
    console.log('getting registrations');
    res.send(registrations);
});

app.get('/api/logout', (req, res) => {
  const user = firebase.auth().currentUser;
  console.log(user);
});