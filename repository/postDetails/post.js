const { connect, disconnect } = require('../../config/db.config');
const Comments = require('../../model/comments.model');
const Likes = require('../../model/likes.model');
const Post = require('../../model/post.model');

class PostRepository {
	constructor() {
		connect();
	}

	async getAllPosts() {
		let posts;
		try {
			const posts = await Post.find().populate({
				path: 'comments',
				populate: {
					path: 'replies',
					populate: {
						path: 'user',
						select: 'name', // Select only the "name" field of the user
					},
				},
			});
			return posts;
			console.log(posts, 'posts');
		} catch (error) {
			console.log('ERROR:', error);
		}
		return posts;
	}

	async createPost(post) {
		let data = {};
		try {
			data = await Post.create(post);
		} catch (error) {
			console.log('ERROR:', error);
		}
		return data;
	}

	async deletePost(id) {
		let data;
		try {
			data = await Post.deleteOne({ _id: id });
		} catch (error) {
			console.log('ERROR:', error);
		}
		return `status ${data.deletedCount > 0 ? 'true' : 'flase'}`;
	}

	async likePost(data) {
		try {
			const { postId, userId } = data;
			const existingLike = await Likes.findOneAndDelete({
				user: userId,
				post: postId,
			});
			console.log(existingLike, 'existingLike');
			if (existingLike) {
				await Post.findByIdAndUpdate(postId, {
					$pull: { likes: existingLike._id },
				});
				return { msg: 'like removed' };
			}

			const like = await Likes.create({ user: userId, post: postId });
			await Post.findByIdAndUpdate(postId, { $push: { likes: like._id } });

			return { msg: 'liked it' };
		} catch (error) {
			console.log('ERROR:', error);
		}
	}

	async commentPost(data) {
		try {
			const { postId, content, parentCommentId, userId } = data;

			console.log(data, 'data');
			let parentComment = null;

			if (parentCommentId) {
				parentComment = await Comments.findById(parentCommentId);
				if (!parentComment) {
					console.log("didn't find");
					return "Parent comment didn't found";
				}
			}
			const comment = await Comments.create({
				content,
				post: postId,
				user: userId,
				parentComment: parentCommentId || null,
			});
			await Post.findByIdAndUpdate(postId, {
				$push: { comments: comment._id },
			});
			return comment;
		} catch (error) {
			console.log('ERROR:', error);
		}
	}
}

module.exports = new PostRepository();
