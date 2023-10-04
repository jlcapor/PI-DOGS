import React from 'react';
import { Link } from 'react-router-dom';
import '../Dog/card.styles.css';

const Dog = ({dog, handlerDelete}) => {
	const handleEliminar = () => {

    const respuesta = confirm('Deseas eliminar?');
		if(respuesta) {
			handlerDelete(id)
		}
    }
	return (
		<div className='card'>
			<div className='image-container'>
				<Link to={`/dogs/detail/${dog.id}`}>
					<img src={dog.image} alt={dog.name}/>
				</Link>
				<span className="favorite-heart">❤️</span>
			</div>

			<div className="card-content">
				<h2>{dog.name}</h2>
				<p><span>Temperaments: </span> {dog.temperament}</p>
				<p><span>Weight:</span> {dog.weight} kgs</p>
				{dog.created && (
					<div className="button-container">
						<button className="delete-button" onClick={handleEliminar}>
							🗑️
						</button>
        		    </div>
				)}
				
			</div>
		</div>
	);
};


export default Dog;