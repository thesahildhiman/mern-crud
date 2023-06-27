const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const postRoutes = require('./routes/post');
const uploadsDirectory = path.join(__dirname, 'uploads');
console.log('---uploads dirrr---', uploadsDirectory);
const port = 8000;
mongoose
	.connect('mongodb://localhost:27017/test', { useNewUrlParser: true })
	.then(() => {
		const app = express();
		app.use((req, res, next) => {
			res.setHeader('Access-Control-Allow-Origin', '*');
			res.setHeader(
				'Access-Control-Allow-Methods',
				'GET, POST, PUT, DELETE'
			);
			res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
			next();
		});
		app.use(express.json());
		app.use('/', postRoutes);
		app.use(express.static(uploadsDirectory));
		app.listen(port, () => {
			console.log(`Server has started ${port}!`);
		});
	});
