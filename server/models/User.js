const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let UserSchema = new Schema({
	first_name: {
		type: String,
		trim: true,
	},
	last_name: {
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
	avgRating: {
		type: Number,
		default: 0
	},
	reviews: [{type: Schema.Types.ObjectId, ref: 'Review'}],
	orders_placed: [{type: Schema.Types.ObjectId, ref: 'Product'}],
	products_offered: [{type: Schema.Types.ObjectId, ref: 'Product'}],
})

mongoose.model('User', UserSchema)
