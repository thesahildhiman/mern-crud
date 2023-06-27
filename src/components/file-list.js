import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';
const FileList = () => {
	const [files, setFiles] = useState([]);
	const { id } = useParams();
	useEffect(() => {
		axios.get(`http://localhost:8000/posts/upload/${id}`).then((resp) => {
			console.log('----resp--->>>>', resp);
			setFiles(resp.data);
		});
	}, []);
	console.log('---files---', files);
	if (files.length < 1) {
		return <>No images to show</>;
	}
	return (
		// <div className='image-gallery'>
		// 	{files.map((image, index) => (
		// 		<img
		// 			key={index}
		// 			src={`http://localhost:8000/${image.name}`}
		// 			alt={`${image.name}`}
		// 		/>
		// 	))}
		// </div>
		<Container>
			<h1>Uploaded Images</h1>
			<Row>
				{files.map((image, index) => (
					<Col key={index} xs={12} sm={6} md={4} lg={3}>
						<img
							src={`http://localhost:8000/${image.name}`}
							alt={image.name.split('.')[0]}
							className='img-fluid'
						/>
					</Col>
				))}
			</Row>
		</Container>
	);
};

export default FileList;
