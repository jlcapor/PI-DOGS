import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import clienteAxios from '../../config/clienteAxios';
import { newDogBreed } from '../../redux/actions/dogActions';
import TemperamentList from '../../components/TemperamentList/TemperamentList';
import validation from '../../helpers/validation';
import './styles/NewDog.styles.css';
import { useNavigate } from 'react-router-dom';

const AddDogForm = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch ();
	const [input, setInput] = useState ({
		name: '',
		heightMin: '',
		heightMax: '',
		weightMin: '',
		weightMax: '',
		lifeSpanMin: '',
		lifeSpanMax: '',
		image: '',
		temperaments: []
	})

	const [errors, setErrors] = useState ({
		name: '',
		heightMin: '',
		heightMax: '',
		weightMin: '',
		weightMax: '',
		lifeSpanMin: '',
		lifeSpanMax: '',
		image: '',
		temperaments: []
	})
	
	const [temperamentsDb, setTemperamentsDb] = useState ([])
	const [selectedTemperament, setSelectedTemperament] = useState('');
	
	useEffect(() => {
	  const getTemperaments = async () => {
		try {
			const { data } = await clienteAxios.get('/temperaments')
			setTemperamentsDb(data);
		} catch (error) {
			console.log(error)
		}
	  }
	  getTemperaments()
	}, []);



	const handlerChange = (event) => {
		event.preventDefault ();
		setInput ( {
			...input,
			[event.target.name]: event.target.value
		})

		setErrors(
			validation({
			  ...input,
			  [event.target.name]: event.target.value,
			})
		  );
	}


	const handleSelect = (event) => {
		const id = Number(event.target.value);
		if (!input.temperaments.some((temp) => temp.id === id)) {
			const temperament = temperamentsDb.find(item => item.id === id);
				setInput ({
				...input, 
				temperaments:  [...input.temperaments, temperament]
			})
			setSelectedTemperament('')
		}else{
			console.log('Erro')
		}
	}

	const deleteTemperament = (id) =>{
		const filteredTemperament = input.temperaments.filter((temperament) => temperament.id !== Number(id));
		setInput({
			...input,
			temperaments: filteredTemperament
		});
	}


	const handleSubmit = (event) => {
		event.preventDefault();
		const dogBreed = {
			name: input.name,
			height: `${input.heightMin} - ${input.heightMax} cm`,
			weight: `${input.weightMin} - ${input.weightMax}`,
			life_span: `${input.lifeSpanMin} - ${input.lifeSpanMax} years`,
			image: input.image,
			temperaments: input.temperaments
		}
		dispatch(newDogBreed(dogBreed));
		setInput ({
			name: '',
			heightMin: '',
			heightMax :'',
			weightMin: '',
			weightMax: '',
			lifeSpanMin: '',
			lifeSpanMax: '',
			temperaments: []
		})
		navigate('/dogs/home')
	}

	const diseableHandler = () =>{
		let diseable
		for (let error in errors) {
		 if(errors[error] === ""){
			diseable=false;
		 }else{
			diseable=true;
			break
		 }
		}
		return diseable
	  }

	return ( 
		<div className="form-container">
			<h2 className="form-title">New Dog Breed</h2>
			<form className='form' onSubmit={handleSubmit}>
				<div className="form-group">
					<label htmlFor="name">Name</label>
					<input
						type="text"
						id="name"
						name="name"
						value={input.name}
						onChange={handlerChange}
						placeholder='Name'
					/>
					<div className="error-message">
					 {errors.name && <p>{errors.name}</p>}
					</div>
				</div>

				<div className="form-group double-group">
					<div className="half-group">
						<label htmlFor="heightMin">Height Min</label>
						<div className="input-container">
							<input
								type="number"
								id="heightMin"
								name="heightMin"
								value={input.heightMin}
								onChange={handlerChange}
								placeholder='Height Min'
							/>
							<div className="error-message">
					 			{errors.heightMin && <p>{errors.heightMin}</p>}
							</div>
						</div>
					</div>
					<div className="half-group">
						<label htmlFor="heightMax">Height Max</label>
						<div className="input-container">
							<input
								type="number"
								id="heightMax"
								name="heightMax"
								value={input.heightMax}
								onChange={handlerChange}
								placeholder='Height Max'							/>
						</div>
						<div className="error-message">
					 		{errors.heightMax && <p>{errors.heightMax}</p>}
						</div>
					</div>
					
				</div>

				<div className="form-group double-group">
					<div className="half-group">
						<label htmlFor="weightMin">Weight Min</label>
						<input
							type="number"
							id="weightMin"
							name="weightMin"
							value={input.weightMin}
							onChange={handlerChange}
							placeholder='Weight Min'
						/>
						<div className="error-message">
							{errors.weightMin && <p>{errors.weightMin}</p>}
						</div>
					</div>
					<div className="half-group">
						<label htmlFor="weightMax">Weight Max</label>
						<input
							type="number"
							id="weightMax"
							name="weightMax"
							value={input.weightMax}
							onChange={handlerChange}
							placeholder='Weight Max'
						/>
						<div className="error-message">
							{errors.weightMax && <p>{errors.weightMax}</p>}
						</div>
					</div>
				</div>

				<div className="form-group double-group">
					<div className="half-group">
						<label htmlFor="lifeSpanMin">Life Span Min</label>
						<input
							type="number"
							id="lifeSpanMin"
							name="lifeSpanMin"
							value={input.lifeSpanMin}
							onChange={handlerChange}
							placeholder='Life Span Min'
						/>

						<div className="error-message">
							{errors.lifeSpanMin && <p>{errors.lifeSpanMin}</p>}
						</div>
					</div>

					<div className="half-group">
						<label htmlFor="lifeSpanMax">Life Span Max</label>
						<input
							type="number"
							id="lifeSpanMax"
							name="lifeSpanMax"
							value={input.lifeSpanMax}
							onChange={handlerChange}
							placeholder='Life Span Max'
						/>
						<div className="error-message">
							{errors.lifeSpanMax && <p>{errors.lifeSpanMax}</p>}
						</div>
					</div>
				</div>

				<div className="form-group">
					<label htmlFor="image">Image</label>
					<input
						type="text"
						id="image"
						name="image"
						value={input.image}
						onChange={handlerChange}
						placeholder='Image'
					/>
				</div>

				<div className="form-group">
						<label >Temperaments</label>
						<select
							name='temperaments'
							onChange={handleSelect}
							value={selectedTemperament}
						>
							<option value="">--Elegir temperamento/s--</option>
							{temperamentsDb.map((tem)=>(
								<option key={tem.id} value={tem.id}>{tem.name}</option>
							))}
						</select>
						 {
							<TemperamentList 
							   temperaments={input.temperaments}
							   deleteTemperament={deleteTemperament}
							/>
						
						}
						
				</div>

				<button disabled={diseableHandler()} type="submit" className='button'>SAVE</button>
			</form>
		</div>
	);
};


export default AddDogForm;