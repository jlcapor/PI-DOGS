import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Dog/card.styles.css';
import { useDispatch } from 'react-redux';
import { getDogEdit, removeDogBreed } from '../../redux/actions/dogActions';

const Dog = ({dog}) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const confirmDeleteDog = (id) =>{
		const respuesta = confirm('Deseas eliminar?');
		if(respuesta) {
			dispatch(removeDogBreed(id))
		}
	}

	const redirectEdit = (dog) =>{
		dispatch(getDogEdit(dog));
		navigate(`/dogs/update/${dog.id}`)
	}
	return (
		<div className='card'>
			<div className='image-container'>
				<Link to={`/dogs/detail/${dog.id}`}>
					<img src={dog.image} alt={dog.name}/>
				</Link>
				{/* <span className="favorite-heart">❤️</span> */}
			</div>

			<div className="card-content">
				<h2>{dog.name}</h2>
				<p><span>Temperaments: </span> {dog.temperament}</p>
				<p><span>Weight:</span> {dog.weight} kgs</p>
				{dog.created && (
					<div className='button-container'>
						<button className="card-btn-update"  onClick={ () => redirectEdit(dog) }>
							Update
						</button>
						<button className="card-btn-delete" onClick={()=>confirmDeleteDog(dog.id)}>
							Delete
						</button>
        		    </div>
				)}
				
			</div>
		</div>
	);
};


export default Dog;