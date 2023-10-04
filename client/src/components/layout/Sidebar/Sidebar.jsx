import React from 'react';
import styles from './Sidebar.module.css';

const Sidebar = () => {
	return (
		<div className={styles.sidebar}>
			<a href="/">Enlace 1</a>
			<a href="/">Enlace 2</a>
			<a href="/">Enlace 3</a>
		</div>
		
	);
};


export default Sidebar;