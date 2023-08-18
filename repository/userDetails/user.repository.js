const { connect, disconnect } = require('../../config/db.config');
const User = require('../../model/user.model');
let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');
const Post = require('../../model/post.model');

class UserRepository {
	constructor() {
		connect();
	}
	async getUsers() {
		const users = await User.find({});
		console.log('Users:', users);
		return users;
	}

	async createUser(user) {
		try {
			const email = user.email;
			const userFind = await User.findOne({ email });
			if (userFind) {
				return { status: 403, msg: 'User Already Exists' };
			}
			let hasPassword = bcrypt.hashSync(user.password, 8);
			user.password = hasPassword;
			await User.create(user);

			let token = jwt.sign({ id: user._id }, 'SECRETKEY', {
				expiresIn: 86400,
			});
			let result = { auth: true, token: token };
			return result;
		} catch (error) {
			console.log('ERROR::', error);
			return 'Error:', error;
		}
	}

	async loginUser(user) {
		try {
			const { email, password } = user;
			console.log(user);
			const loginUser = await User.findOne({ email });
			if (!loginUser) {
				return { status: 404, msg: 'User Not Found' };
			}
			const pswMatch = bcrypt.compareSync(password, loginUser.password);
			if (!pswMatch) return { status: 401, msg: 'Wrong Password' };
			const token = jwt.sign({ id: loginUser._id }, 'SECRETKEY', {
				expiresIn: 86400,
			});
			return { status: 200, auth: true, token: token, id: loginUser._id };
		} catch (error) {
			console.log('ERROR:', error);
			return 'Error:', error;
		}
	}

	async updateUser(user) {
		let data = {};
		try {
			data = await User.updateOne(user);
		} catch (error) {
			console.log('ERROR::', error);
		}
		return data;
	}

	async deleteUser(id) {
		let data = {};
		try {
			data = await User.deleteOne({ _id: id });
		} catch (error) {
			console.log('Error::', error);
		}
		return `status ${data.deletedCount > 0 ? true : false}`;
	}

	async getUser(id) {
		try {
			const user = await User.findById(id);
			if (!user) {
				return res.status(404).json({ error: 'User not found' });
			}
			let userPosts = [];
			if (user && user._id == id) {
				userPosts = await Post.find({ user: user._id });
			}
			return { user, posts: userPosts };

			// Return the user profile along with their posts
		} catch (error) {
			console.log('Error:', error);
		}
	}

	async followUser(data) {
		try {
			const { userId, followerId } = data;

			const userFollow = await User.findById({ _id: userId });
			if (!userFollow) {
				return 'user not exists';
			}
			const follower = await User.findById({ _id: followerId });
			if (!follower) {
				return 'follower does not exist';
			}
			if (userFollow.followers.includes(followerId)) return 'Already Following';

			userFollow.followers.push(followerId);
			await userFollow.save();

			follower.following.push(userId);
			await follower.save();

			return 'you are successfully following';
		} catch (error) {
			console.log('Error:', error);
		}
	}

	async unfollowUser(data) {
		try {
			const { userId, unfollowerId } = data;

			const userFollow = await User.findById(userId);
			if (!userFollow) return 'user not exists';

			const follower = await User.findById(unfollowerId);
			if (!follower) return 'follower not exist';

			userFollow.followers = userFollow.followers.filter(
				(follower) => follower.toString() !== unfollowerId
			);
			await userFollow.save();

			follower.following = follower.following.filter(
				(user) => user.toString() !== userId
			);
			await follower.save();
			return 'you are successfully unfollowing';
		} catch (error) {
			console.log('Error:', error);
		}
	}
}

module.exports = new UserRepository();
