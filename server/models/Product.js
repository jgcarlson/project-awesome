const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let ProductSchema = new Schema(){
	title: {
		type: String,
		required: [true, "Title is required"],
		minlength: [10, "Title must be at least 2 characters long"]
	},
	description: {
		type: String,
		required: [true, "Description is required"]
	},
	rating: {
		type: Number,
		default: 0
	},
	_vendor: [{type: Schema.Types.ObjectId, ref: 'User'}],
	tags: [{type: String}],
	images: [{type: String}]
},

mongoose.model('Product', ProductSchema)
