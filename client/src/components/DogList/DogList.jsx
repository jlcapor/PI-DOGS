import React from 'react';
import styles from './Cards.module.css';
import Dog from '../Dog/Dog';

const DogList = ({filterDogs, handlerDelete}) => {
	return (
		<div className={styles.cards}>
			{
                filterDogs.length ? 
                filterDogs.map(dog => (
                    <Dog 
                        key={dog.id}
                        dog={dog}
                        handlerDelete={handlerDelete}
                    />
                ))
                : <p>No hay perros</p>
            }
		</div>
	);
};

export default DogList;