import React from 'react';
import styles from './Temperament.module.css';
const Temperament = ({temperament, deleteTemperament}) => {

	const handleDelete=(id)=>{
		deleteTemperament(id)
	}
	
	return ( 
	   	<div className={styles.temperament}>
		   {temperament.name} 
		</div>
	);
};

export default Temperament;