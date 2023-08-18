const express = require('express');
const router = express.Router();
const postController = require('../controller/PostControllers/post.controller');

router.get('/', (req, res) => {
	postController.getAllPosts().then((data) => res.json(data));
});

router.post('/create', (req, res) => {
	postController.createPost(req.body).then((data) => res.json(data));
});

router.delete('/delete/:id', (req, res) => {
	postController.deletePost(req.params.id).then((data) => res.json(data));
});

router.post('/:id/like', (req, res) => {
	const request = { postId: req.params.id, userId: req.body.id };
	postController.likePost(request).then((data) => res.json(data));
});

router.post('/:id/comments', (req, res) => {
	const request = {
		postId: req.params.id,
		content: req.body.content,
		parentCommentId: req.body.parentComment,
		userId: req.body.user,
	};
	postController.commentPost(request).then((data) => res.json(data));
});

module.exports = router;
