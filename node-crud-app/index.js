const express = require('express');
const app = express();
const homeRoute = require('./routes/home');
const mongoose = require('mongoose');
var bodyParser = require('body-parser')


mongoose.connect('mongodb://localhost:27017/myfirstmongodb', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', () => { return console.log("Connection failed. Something went wrong!") });
db.once('open', () => {
    console.log('Database Connected.')
});
app.set('view engine', 'ejs');
app.use(express.static('public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());



app.use('/', homeRoute);



app.listen(7001);