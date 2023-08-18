const userService = require('../../service/User/user.service');
const logger = require('../../logger/api.logger');

class UserController {
	constructor() {}

	async getUsers() {
		return await userService.getUsers();
	}
	async createUser(user) {
		logger.info('Controller: createUser', user);
		return await userService.createUser(user);
	}

	async loginUser(user) {
		logger.info('Controller: loginUser', user);
		return await userService.loginUser(user);
	}

	async updateUser(user) {
		logger.info('Controller updateUser', user);
		return await userService.updateUser(user);
	}

	async deleteUser(id) {
		logger.info('Controller DeleteUser,', id);
		return await userService.deleteUser(id);
	}

	async getUser(id) {
		logger.info('Controller getUser', id);
		return await userService.getUser(id);
	}

	async getPosts() {
		logger.info('Controller GetPosts,');
		return await userService.getPosts();
	}
	async followUser(data) {
		logger.info('Controller followUser,');
		return await userService.followUser(data);
	}

	async unfollowUser(data) {
		logger.info('Controller unfollowUser,');
		return await userService.unfollowUser(data);
	}
}

module.exports = new UserController();
