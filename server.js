const express = require('express');
const bodyParser = require('body-parser')//add this
const app = express();
const port = 3000;

const registrations = require('./src/registrations');

app.use(bodyParser())//add this before any route or before using req.body

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

app.get('/api/registrations', (req, res) => {
    console.log('getting registrations');
    res.send(registrations);
});