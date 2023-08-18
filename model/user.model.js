const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	userName: { type: String, required: true },
	dob: { type: Date, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
	following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
	posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
	interests: Array,
});

const User = mongoose.model('User', userSchema);
module.exports = User;
