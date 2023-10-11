import React from 'react';
import './nav.styles.css';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = () => {
	const navigate = useNavigate();
	const newDogBreed = () => navigate("/dogs/new-dog");
	return (
		<nav className="navbar">
			<div className="navbar-container">
				<h1>Breeds</h1>
				<ul className="nav-links">
					<li><Link to="/dogs/home">Dogs</Link></li>
					<li><Link to="/">Lading Page</Link></li>
					<li><button  className="botonLink" onClick={newDogBreed}>New Breed</button></li>
				</ul>
			</div>
    	</nav>
	);
};

export default NavBar;