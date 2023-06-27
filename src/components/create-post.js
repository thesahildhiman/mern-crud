import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Alert } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
const CreatePost = () => {
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [alertSuccess, setAlertSuccess] = useState(false);
	const [alertError, setAlertError] = useState(false);
	const history = useHistory();
	console.log('--createPOst');
	const onChangePostTitle = (e) => {
		console.log('---title=---', title);
		setTitle(e.target.value);
	};
	const onChangePostContent = (e) => {
		console.log('---content=---', content);
		setContent(e.target.value);
	};

	const onSubmit = (e) => {
		e.preventDefault();
		if (title.trim() === '' || content.trim() === '') {
			setAlertError(true);
			setTimeout(() => {
				setAlertError(false);
			}, 1000);
		} else {
			const postObject = {
				title,
				content,
			};
			console.log('----postObj----', postObject);
			axios
				.post('http://localhost:8000/posts', postObject)
				.then((res) => {
					setAlertSuccess(true);
					setTimeout(() => {
						setAlertSuccess(false);
						history.push('/list-posts');
					}, 1000);
				});
			setTitle('');
			setContent('');
		}
	};
	return (
		<>
			{alertSuccess && <Alert variant='success'>Post created!</Alert>}
			{alertError && <Alert variant='danger'>Post not created!</Alert>}
			<div className='form-wrapper'>
				<Form onSubmit={onSubmit}>
					<Form.Group controlId='Title'>
						<Form.Label>Title</Form.Label>
						<Form.Control
							type='text'
							value={title}
							onChange={onChangePostTitle}
						/>
					</Form.Group>
					<Form.Group controlId='Content'>
						<Form.Label>Content</Form.Label>
						<Form.Control
							type='text'
							value={content}
							onChange={onChangePostContent}
						/>
					</Form.Group>
					<br />
					<Button
						variant='danger'
						size='lg'
						block='block'
						type='submit'>
						Create Post
					</Button>
				</Form>
			</div>
		</>
	);
};
export default CreatePost;
