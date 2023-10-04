import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LadingPage.module.css';

const LadingPage = () => {
	const navigate = useNavigate();
	const handleHomePage = () => navigate("/dogs/home");
	return (
		<div className='homepage'>
			<h1>
				Dogs
			</h1>
			<button onClick={handleHomePage}>Home Page</button>
		</div>
	);
};


export default LadingPage;