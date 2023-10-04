import React from 'react';
import './nav.styles.css';
import { Link } from 'react-router-dom';

const NavBar = () => {
	return (
		<nav className="navbar">
			<div className="navbar-container">
				<h1>Dogs</h1>
				<ul className="nav-links">
					<li><Link to="/dogs/home">Dogs</Link></li>
					<li><Link href="/about">About</Link></li>
					<li><Link href="/contact">Contact</Link></li>
				</ul>
			</div>
    	</nav>
	);
};

export default NavBar;