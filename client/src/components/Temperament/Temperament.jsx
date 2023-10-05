import React from 'react';
import styles from './Temperament.module.css';
const Temperament = ({temperament, deleteTemperament}) => {
	console.log(temperament.id)
	return ( 
	   	<div className={styles.temperament} onClick={() => deleteTemperament(temperament.id)}>
		   {temperament.name}
		</div>
	);
};

export default Temperament;