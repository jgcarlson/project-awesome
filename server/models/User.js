const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Make sure to add changes to front-end schema as well (as applicable).
let UserSchema = new Schema({
  first_name: {
    type: String,
    trim: true,
  },
  last_name: {
    type: String,
    trim: true,
  },
  alias: {
    type: String,
    trim: true,
    required: [true, "An alias is required."],
    unique: true
  },
  admin: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    required: [true, "Email is required"],
    unique: true
  },
  password: {
    type: String,
    trim: true,
    required: [true, "Password is required"],
  },
  admin: {
    type: Boolean,
    default: false
  },
  vendor: {
    type: Boolean,
    default: false
  },
  totalRating: {
    type: Number,
    default: 0
  },
  numReviews: {
    type: Number,
    default: 0
  },
  avgRating: {
    type: Number,
    default: 0
  },
  basket: [{type: Schema.Types.ObjectId, ref: 'Product'}],
  reviews: [{type: Schema.Types.ObjectId, ref: 'Review'}],
  orders_placed: [{type: Schema.Types.ObjectId, ref: 'Product'}],
  products_offered: [{type: Schema.Types.ObjectId, ref: 'Product'}],
  recently_viewed: [{type: Schema.Types.ObjectId, ref: 'Product'}],
  payments: []
}, {timestamps: true} )

mongoose.model('User', UserSchema)
