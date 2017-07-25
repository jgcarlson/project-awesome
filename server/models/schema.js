// server/models/models.js
// This is the file that specifies the schema to be loaded by mongoose.
// This file is required by mongoose.js.
// We do not need to require this file in the controller, instead, the model itself is loaded from mongoose.
// There can be many models in the server/models folder.

const mongoose = require('mongoose');

// create the schema
const ProtoSchema = new mongoose.Schema({
  firstname: { type: String, trim: true, required: [ true, 'First name is required.'] },
  lastname: { type: String, trim: true, required: [ true, 'Last name is required.'] },
  username: { type: String, trim: true, unique: true, required: [ true, 'Username is required.'] },
  email: { type: String, trim: true, unique: true, required: [ true, 'Email is required.'] },
  dob: { type: String, trim: true, required: [ true, 'Birth date is required.'] },
  password: { type: String, trim: true, required: [ true, 'Password is required.'] },
  admin: { type:Boolean, default: false }
}, {timestamps: true});

// register the schema as a model
mongoose.model('Proto', ProtoSchema);

const ProtoUserSchema = new mongoose.Schema({
  firstname: { type: String, trim: true, required: [ true, 'First name is required.'] },
  lastname: { type: String, trim: true, required: [ true, 'Last name is required.'] },
  alias: { type: String, trim: true, unique: true, required: [ true, 'Alias is required.'] },
  email: { type: String, trim: true, unique: true, required: [ true, 'Email is required.'] },
  password: { type: String, trim: true, required: [ true, 'Password is required.'] },
  admin: { type:Boolean, default: false }
}, {timestamps: true});
