const express = require('express');
const Post = require('../models/post');
const File = require('../models/file');
const postRouter = express.Router();
const multer = require('multer');
var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './uploads');
	},
	filename: function (req, file, cb) {
		const ext = file.mimetype.split('/')[1];
		cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
		// cb(null, file.originalname);
	},
});
// function fileFilter(req, file, cb) {
// 	console.log('=====file ext====', file);
// 	// Example condition: Accept only image files
// 	if (file.mimetype.startsWith('image/')) {
// 		cb(null, true); // Accept the file
// 	} else {
// 		cb(null, false); // Reject the file
// 	}
// }
const upload = multer({
	storage: storage,
	// fileFilter: fileFilter,
	limits: { fileSize: 1000000 },
});

postRouter.get('/posts', async (req, res) => {
	const limit = parseInt(req.query.limit);
	const page = parseInt(req.query.page);
	try {
		const totalPosts = await Post.countDocuments();
		const totalPages = Math.ceil(totalPosts / limit);

		const posts = await Post.find()
			.skip((page - 1) * limit)
			.limit(limit)
			.sort({ createdAt: -1 });

		res.json({
			success: true,
			message: 'Posts retrieved successfully.',
			data: {
				posts,
				currentPage: page,
				totalPages,
				totalPosts,
			},
		});
		// console.log('---posts---', posts);
		// res.send(posts);
	} catch (err) {
		res.status(500).json({ success: false, message: err.message });
	}
	// const posts = await Post.find().skip(startIndex).limit(limit);
	// res.send(posts);
});
postRouter.post('/posts', async (req, res) => {
	const post = new Post({
		title: req.body.title,
		content: req.body.content,
	});
	console.log('---post-----', post);
	await post.save();
	res.send(post);
	// res.send('----post---', req);
});
postRouter.get('/posts/:id', async (req, res) => {
	console.log('-------', req.params.id);
	const post = await Post.findOne({ _id: req.params.id });
	res.send(post);
});
postRouter.put('/posts/:id', async (req, res) => {
	try {
		console.log('---find one--');
		const post = await Post.findOne({ _id: req.params.id });
		console.log('---find one--', post);
		if (req.body.title) {
			post.title = req.body.title;
		}
		if (req.body.content) {
			post.content = req.body.content;
		}
		await post.save();
		res.send(post);
	} catch (err) {
		res.send(err);
	}
});
postRouter.delete('/posts/:id', async (req, res) => {
	try {
		const result = await Post.deleteOne({ _id: req.params.id });
		if (result.deletedCount === 0) {
			res.status(404).send('==post doesn"t exist==');
		} else {
			res.status(204).send('post deleted');
		}
	} catch (err) {
		res.status(404).send('post doesn"t exist');
	}
});
postRouter.post(
	'/posts/upload/:id',
	upload.single('file'),
	async (req, res) => {
		// upload(req, res, async (err) => {
		// 	if (err) {
		// 		res.status(400).send('Something went wrong!');
		// 	}
		console.log('====req=====', req.params.id);
		// console.log('-----req----', req);
		// res.send(req.file);
		// });

		try {
			const newFile = new File({
				name: req.file.filename,
				post_id: req.params.id,
			});
			await newFile.save();
			// res.status(200).json({
			// 	status: 'success',
			// 	message: 'File created successfully!!',
			// });
			res.status(200).send(req.file);
		} catch (error) {
			res.json({
				error,
			});
		}
	}
);
postRouter.get('/posts/upload/:id', async (req, res) => {
	console.log('-------', req.params.id);
	const file = await File.find({ post_id: req.params.id });
	console.log('----file---', file);
	res.send(file);
});
module.exports = postRouter;
