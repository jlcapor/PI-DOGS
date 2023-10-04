import React from 'react';
import Temperament from '../Temperament/Temperament';
import styles from './TemperamentList.module.css';

const TemperamentList = ({temperaments, deleteTemperament}) => {
	return (
		<div className={styles.temperamentlist}>
			<ul>
				{
					temperaments.length ? 
					temperaments.map(temperament => (
						<li>
							<Temperament 
								key={temperament.id}
								temperament={temperament}
								deleteTemperament={deleteTemperament}
							/>
						</li>
						
					))
					: <p>No temperaments selected</p>
				}
			</ul>
		</div>
	);
};


export default TemperamentList;