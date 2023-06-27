import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import CreatePost from './components/create-post';
import EditPost from './components/edit-post';
import ListPosts from './components/list-posts';
import FileList from './components/file-list';
import Donate from './components/donate';
const App = () => {
	return (
		<div className='App'>
			<Router>
				<header className='App-header'>
					<Navbar bg='dark' variant='dark'>
						<Container>
							<Navbar.Brand>
								<Link to={'/create-post'} className='nav-link'>
									React MERN Stack App
								</Link>
							</Navbar.Brand>
							<Nav className='justify-content-end'>
								<Nav>
									<Link
										to={'/create-post'}
										className='nav-link'>
										Create Post
									</Link>
								</Nav>
								<Nav>
									<Link
										to={'/list-posts'}
										className='nav-link'>
										Post List
									</Link>
								</Nav>
								<Nav>
									<Link to={'/donate'} className='nav-link'>
										Donate
									</Link>
								</Nav>
							</Nav>
						</Container>
					</Navbar>
				</header>
				<Container>
					<Row>
						<Col md={12}>
							<div className='wrapper'>
								<Switch>
									<Route
										exact
										path='/'
										component={(props) => (
											<CreatePost {...props} />
										)}
									/>
									<Route
										exact
										path='/create-post'
										component={(props) => (
											<CreatePost {...props} />
										)}
									/>
									<Route
										exact
										path='/edit-post/:id'
										component={(props) => (
											<EditPost {...props} />
										)}
									/>
									<Route
										exact
										path='/list-posts'
										component={(props) => (
											<ListPosts {...props} />
										)}
									/>
									<Route
										exact
										path='/posts/upload/:id'
										component={(props) => (
											<FileList {...props} />
										)}
									/>
									<Route
										exact
										path='/donate'
										component={(props) => (
											<Donate {...props} />
										)}
									/>
								</Switch>
							</div>
						</Col>
					</Row>
				</Container>
			</Router>
		</div>
	);
};
export default App;
