// server/config/mongoose.js
// This is the file that connects to the database and loads all of the models.
// Here we specify a database to connect to and the path where all of our models are.
// This file is required by server.js.

// require mongoose
const mongoose = require('mongoose');
// require path for getting the models path
const path = require('path');
// require the fs module for loading model files
const fs = require('fs');
// connect to mongoose!
mongoose.connect('mongodb://localhost/default', {  // add db after 'localhost/'
  useMongoClient: true
});
// create a variable that points to the path where all of the models live
const models_path = path.join(__dirname, './../models');
// read all of the files in the models_path and require (run) each of the javascript files
fs.readdirSync(models_path).forEach((file) => {
  if(file.indexOf('.js') >= 0) {
    // require the file (this runs the model file which registers the schema)
    require(models_path + '/' + file);
  }
});
