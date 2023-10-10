import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LadingPage.module.css';

const LadingPage = () => {
	const navigate = useNavigate();
	const handleHomePage = () => navigate("/dogs/home");
	return (
		<div> 
			<h1 className={styles.title}>Dog Breeds</h1>
			<div className={styles.ladingPage}>
				<div className={styles.fixedContent}>
					<button  className={styles.button} onClick={handleHomePage}>Home Page</button>
				</div>
			</div>
		</div>
		
	);
};


export default LadingPage;