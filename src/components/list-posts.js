import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import PostTableRow from './posts-table';
import { Alert } from 'react-bootstrap';
import Pagination from './Pagination';
const ListPosts = () => {
	const [posts, setPosts] = useState([]);
	const [deleteAlert, setDeleteAlert] = useState(false);
	const [activePage, setActivePage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [uploadAlert, setUploadAlert] = useState(false);
	const postsPerPage = 5;
	useEffect(() => {
		axios
			.get(
				`http://localhost:8000/posts?limit=${postsPerPage}&page=${activePage}`,
				{
					params: {
						limit: postsPerPage,
						page: activePage,
					},
				}
			)
			.then((res) => {
				setPosts(res.data.data.posts);
				setTotalPages(res.data.data.totalPages);
			})
			.catch((err) => {
				console.log('err-->', err);
			});
	}, [activePage]);
	console.log('-----active page----', activePage);
	const handlePostDelete = (postId) => {
		axios
			.delete(`http://localhost:8000/posts/${postId}`)
			.then((res) => {
				console.log(res, 'Post successfully deleted!');
				// Remove the deleted post from the posts state
				if (res.status === 204) {
					setDeleteAlert(true);
				}
				setPosts(posts.filter((post) => post._id !== postId));
				setTimeout(() => {
					setDeleteAlert(false);
				}, 2000);
			})
			.catch((error) => {
				console.log('err-', error);
			});
	};
	const handlePageChange = (pageNumber) => {
		setActivePage(pageNumber);
	};
	const indexOfLastPost = activePage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;
	// const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
	const DataTable = () => {
		return posts?.map((res, i) => {
			const srNo = i + indexOfFirstPost;
			return (
				<PostTableRow
					obj={res}
					key={i}
					idx={srNo}
					onDelete={handlePostDelete}
					setUploadAlert={setUploadAlert}
				/>
			);
		});
	};
	return (
		<>
			{deleteAlert && <Alert variant='danger'>Post deleted!</Alert>}
			{uploadAlert && <Alert variant='success'>File Uploaded!</Alert>}
			<div className='table-wrapper'>
				<Table striped bordered hover>
					<thead>
						<tr>
							<th>SrNo</th>
							<th style={{ maxWidth: '50px' }}>Title</th>
							<th style={{ maxWidth: '50px' }}>Content</th>
							<th>Options</th>
							<th>Uploads</th>
						</tr>
					</thead>
					<tbody>{DataTable()}</tbody>
				</Table>
				<Pagination
					currentPage={activePage}
					totalPages={totalPages}
					onPageChange={handlePageChange}
				/>
			</div>
		</>
	);
};
export default ListPosts;
