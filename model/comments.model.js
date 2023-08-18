const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
	content: String,
	post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' }, // Reference to Post collection
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to the User collection
	parentComment: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Comment',
		default: null,
	}, // Reference to Comment collection (for reply comments)
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
