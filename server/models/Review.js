const mongoose = require('mongoose')

const Schema = mongoose.Schema;

// Make sure to add changes to front-end schema as well (as applicable).
let ReviewSchema = new Schema({
  review: {
    type: String,
    required: [true, "Review is required"]
  },
  rating: {
    type: Number,
    required: [true, "Rating is required"]
  },
  _byUser: {
    type: Schema.Types.ObjectId, ref: "User"
  },
  _reviewedVendor: {
    type: Schema.Types.ObjectId, ref: "User"
  },
  _reviewedProduct: {
    type: Schema.Types.ObjectId, ref: "Product"
  }
}, {timestamps: true})

mongoose.model('Review', ReviewSchema)
