const mongoose = require('mongoose');

const schema = mongoose.Schema(
	{
		// createdAt: {
		// 	type: Date,
		// 	default: Date.now,
		// },
		name: {
			type: String,
			required: [true, 'Uploaded file must have a name'],
		},
		post_id: {
			type: String,
			required: [true, 'post id must be defined'],
		},
	},
	{
		timestamps: {
			createdAt: true,
		},
	}
);

module.exports = mongoose.model('File', schema);
