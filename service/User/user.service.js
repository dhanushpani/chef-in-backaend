const userRepository = require('../../repository/userDetails/user.repository');

class UserService {
	constructor() {}

	async getUsers() {
		return await userRepository.getUsers();
	}
	async createUser(user) {
		return await userRepository.createUser(user);
	}
	async loginUser(user) {
		return await userRepository.loginUser(user);
	}
	async updateUser(user) {
		return await userRepository.updateUser(user);
	}
	async deleteUser(id) {
		return await userRepository.deleteUser(id);
	}
	async getUser(id) {
		return await userRepository.getUser(id);
	}
	async getPosts() {
		return await userRepository.getPosts();
	}
	async followUser(data) {
		return await userRepository.followUser(data);
	}
	async unfollowUser(data) {
		return await userRepository.unfollowUser(data);
	}
}

module.exports = new UserService();
