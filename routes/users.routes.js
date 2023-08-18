const express = require('express');
const router = express.Router();
const userController = require('../controller/UserControllers/user.controller');
const authenticateToken = require('../middleware/authMiddleware');
const mongoose = require('mongoose');

router.get('/', (req, res) => {
	userController.getUsers().then((data) => res.json(data));
});

router.get('/user/:id', (req, res) => {
	var objectId = mongoose.Types.ObjectId(req.params.id);
	userController.getUser(objectId).then((data) => {
		if (data.status == 200) {
			res.json(data);
		} else {
			res.json(data);
		}
	});
});

router.post('/create', (req, res) => {
	userController.createUser(req.body).then((data) => res.json(data));
});

router.post('/login', (req, res) => {
	userController.loginUser(req.body).then((data) => res.json(data));
});

router.put('/update', (req, res) => {
	userController.updateUser(req.body).then((data) => res.json(data));
});

router.delete('/delete/:id', (req, res) => {
	userController.deleteUser(req.params.id).then((data) => res.json(data));
});

router.post('/:id/follow', (req, res) => {
	const request = { userId: req.params.id, followerId: req.body.followerId };
	userController.followUser(request).then((data) => res.json(data));
});

router.post('/:id/unfollow', (req, res) => {
	const request = {
		userId: req.params.id,
		unfollowerId: req.body.unfollowerId,
	};
	userController.unfollowUser(request).then((data) => res.json(data));
});

module.exports = router;
