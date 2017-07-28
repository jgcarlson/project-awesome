const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Make sure to add changes to front-end schema as well (as applicable).
let OrderSchema = new Schema({
  products: [{type: Schema.Types.ObjectId, ref: 'Product'}],
  _user: {type: Schema.Types.ObjectId, ref: 'User'},
},
{timestamps: true})

mongoose.model('Order', OrderSchema)
