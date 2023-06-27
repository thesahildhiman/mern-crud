import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
const PostTableRow = ({ obj, idx, onDelete, setUploadAlert }) => {
	const [selectedFile, setSelectedFile] = useState(null);

	const history = useHistory();
	const deletePost = () => {
		onDelete(obj._id);
	};
	const handleFileUpload = (id) => {
		const formData = new FormData();
		formData.append('file', selectedFile);
		console.log(
			'----selected file---',
			selectedFile,
			id,
			formData.get('file')
		);
		// call upload API here using formData
		axios
			.post(`http://localhost:8000/posts/upload/${id}`, formData)
			.then((response) => {
				setUploadAlert(true);
				console.log(response, 'File uploaded successfully!');
				setTimeout(() => {
					setUploadAlert(false);
				}, 3000);
			})
			.catch((error) => {
				console.error('File upload failed:', error);
			});
	};
	const handleFileInputChange = (event) => {
		setSelectedFile(event.target.files[0]);
	};
	const showFiles = (id) => {
		history.push(`/posts/upload/${id}`);
	};
	const editPost = (id) => {
		history.push(`/edit-post/${id}`);
	};
	return (
		<tr>
			<td>{idx + 1}</td>
			<td style={{ maxWidth: '400px' }}>{obj.title}</td>
			<td style={{ maxWidth: '400px' }}>{obj.content}</td>
			<td
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}>
				<Button
					onClick={() => editPost(obj._id)}
					size='sm'
					variant='success'>
					Edit
				</Button>
				<Button onClick={deletePost} size='sm' variant='danger'>
					Delete
				</Button>
				<Button
					onClick={() => showFiles(obj._id)}
					size='sm'
					variant='success'>
					Files
				</Button>
			</td>

			<td>
				<Form className='d-flex align-items-center'>
					<Form.Group controlId='formFile' className='flex-grow-1'>
						<Form.Control
							type='file'
							onChange={handleFileInputChange}
						/>
					</Form.Group>
					<Button size='sm' onClick={() => handleFileUpload(obj._id)}>
						Upload
					</Button>
				</Form>
			</td>
		</tr>
	);
};
export default PostTableRow;
