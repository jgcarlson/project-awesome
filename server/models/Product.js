const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Make sure to add changes to front-end schema as well (as applicable).
let ProductSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    minlength: [10, "Title must be at least 10 characters long"]
  },
  description: {
    type: String,
    required: [true, "Description is required"]
  },
  price: {
    type: Number,
    required: [true, "Price is required"]
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
  _vendor: {type: Schema.Types.ObjectId, ref: 'User'},
  tags: {type: String},
  images: [{type: String}],

},
{timestamps: true})

mongoose.model('Product', ProductSchema)
