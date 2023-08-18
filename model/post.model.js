const mongoose = require('mongoose');
const Comment = require('./comments.model');
// const Comments = require('./comments.model');
const Likes = require('./likes.model');
const User = require('./user.model');

const postSchema = new mongoose.Schema({
	title: 'string',
	content: 'string',
	likes: 'number',
	user: { type: mongoose.Schema.Types.ObjectId, ref: User },
	likes: [{ type: mongoose.Schema.Types.ObjectId, ref: Likes }],
	comments: [{ type: mongoose.Schema.Types.ObjectId, ref: Comment }],
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
