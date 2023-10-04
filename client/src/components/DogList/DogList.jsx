import React from 'react';
import styles from './Cards.module.css';
import Dog from '../Dog/Dog';

const DogList = ({currentItems, handlerDelete}) => {
	return (
		<div className={styles.cards}>
			{
                currentItems.length ? 
                currentItems.map(dog => (
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