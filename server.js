// set up ========================
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const passjwt = require('passport-jwt').Strategy;

// configuration =================
mongoose.Promise = global.Promise;
app.use(express.static(path.join(__dirname, 'public', 'dist')))
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(passport.initialize());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
require('./server/config/mongoose.js');
require('./server/config/routes.js')(app);
app.all("*", (req, res, next) => {
    res.sendFile(path.resolve("./public/dist/index.html"))
});

// listen (start app with node server.js) ======================================
var server = app.listen(5000, () => {console.log('-------------------- Server up and running on port 5000 --------------------')});
