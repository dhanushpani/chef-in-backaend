const logger = require('../../logger/api.logger');
const postService = require('../../service/Post/post.service');

class PostController {
	constructor() {}

	async getAllPosts() {
		logger.info('Controller GetPosts,');
		return await postService.getAllPosts();
	}
	async createPost(post) {
		logger.info('Controller CreatePost');
		return await postService.createPost(post);
	}
	async deletePost(id) {
		logger.info('Controller CreatePost');
		return await postService.deletePost(id);
	}
	async likePost(data) {
		logger.info('Controller likePost');
		return await postService.likePost(data);
	}
	async commentPost(data) {
		logger.info('Controller likePost');
		return await postService.commentPost(data);
	}
}

module.exports = new PostController();
