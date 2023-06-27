const mongoose = require('mongoose');

const schema = mongoose.Schema({
	title: String,
	content: String,
	createdAt: {
		type: Date,
		default: Date.now,
	},
	// name: {
	// 	type: String,
	// 	required: [true, 'Uploaded file must have a name'],
	// },
});

module.exports = mongoose.model('Post', schema);
