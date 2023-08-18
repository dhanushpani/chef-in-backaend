const PostRepository = require('../../repository/postDetails/post');

class PostService {
	constructor() {}
	async getAllPosts() {
		return await PostRepository.getAllPosts();
	}
	async createPost(post) {
		return await PostRepository.createPost(post);
	}
	async deletePost(id) {
		return await PostRepository.deletePost(id);
	}
	async likePost(data) {
		return await PostRepository.likePost(data);
	}
	async commentPost(data) {
		return await PostRepository.commentPost(data);
	}
}

module.exports = new PostService();
