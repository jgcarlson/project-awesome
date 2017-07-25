const mongoose = require('mongoose')

const Schema = mongoose.Schema;

let ReviewSchema = new Schema({
	review: {
		type: String
		required: [true, "Review is required"]
	},
	_byUser: {
		type: Schemas.Type.ObjectId, ref: "User"
	},
	_reviewedVendor: [{
		type: Schemas.Type.ObjectId, ref: "User"
	}],
	_reviewedProduct: [{
		type: Schemas.Type.ObjectId, ref: "Product"
	}]
}, {timestamps: true})
