import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
const EditPost = () => {
	const params = useParams();
	const id = params.id;
	const history = useHistory();
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [alertUpdate, setAlertUpdate] = useState(false);
	useEffect(() => {
		axios
			.get(`http://localhost:8000/posts/${id}`)
			.then((res) => {
				console.log('--res---', res);
				setTitle(res.data.title);
				setContent(res.data.content);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);
	const onChangePostTitle = (e) => {
		setTitle(e.target.value);
	};
	const onChangePostContent = (e) => {
		setContent(e.target.value);
	};
	const onSubmit = async (e) => {
		e.preventDefault();
		const postObject = {
			title,
			content,
		};
		try {
			await axios.put(`http://localhost:8000/posts/${id}`, postObject);
			setAlertUpdate(true);
			setTimeout(() => {
				setAlertUpdate(false);
				history.push('/list-posts');
			}, 1000);
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<>
			{alertUpdate && <Alert variant='success'>Post updated!</Alert>}
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
					</Form.Group>{' '}
					<br />
					<Button
						variant='danger'
						size='lg'
						block='block'
						type='submit'>
						Update Post
					</Button>
				</Form>
			</div>
		</>
	);
};
export default EditPost;
