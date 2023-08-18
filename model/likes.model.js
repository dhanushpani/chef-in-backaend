const mongoose = require('mongoose');
const User = require('./user.model');

const likeSchema = new mongoose.Schema({
	post: { type: mongoose.Types.ObjectId, ref: 'Post' },

	user: { type: mongoose.Types.ObjectId, ref: 'User' },
});

const Likes = mongoose.model('Likes', likeSchema);

module.exports = Likes;
