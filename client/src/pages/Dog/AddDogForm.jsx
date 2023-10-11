import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector} from "react-redux";
import validation from '../../helpers/validation';
import { getAllTemperaments } from '../../redux/actions/temperamentActions';
import { createDogBreed } from '../../redux/actions/dogActions'; 
import './styles/NewDog.styles.css';
import Loader from '../../components/Loader/Loader';

const AddDogForm = () => {
	const dispatch = useDispatch ();
	const {temperaments} = useSelector((state) => state.temperamentReducers);
	const dogReviewSave = useSelector((state) => state.dogReducer);
	const { success: dogSaveSuccess } = dogReviewSave;
	const { loading, error } = dogReviewSave;

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
		name: 'Required field',
		heightMin: 'Required field',
		heightMax: 'Required field',
		weightMin: 'Required field',
		weightMax: 'Required field',
		lifeSpanMin: 'Required field',
		lifeSpanMax: 'Required field',
		image: 'Required field',
		temperaments:  'You must select at least one temperament' 
	})
	
	useEffect(() => {
	  dispatch(getAllTemperaments())
	}, []);

	useEffect(() => {
		
		if (dogSaveSuccess) {
			alert('Dog breed successfully created.');
			setInput ({
				name: '',
				heightMin: '',
				heightMax :'',
				weightMin: '',
				weightMax: '',
				lifeSpanMin: '',
				lifeSpanMax: '',
				image: '',
				temperaments: []
			});
			setErrors({
				name: 'Required field',
				heightMin: 'Required field',
				heightMax: 'Required field',
				weightMin: 'Required field',
				weightMax: 'Required field',
				lifeSpanMin: 'Required field',
				lifeSpanMax: 'Required field',
				image: 'Required field',
				temperaments:  'You must select at least one temperament' 
			})
		}
	}, [dogSaveSuccess]);

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
		const selectedTemperament = event.target.value;

		    if(selectedTemperament === ""){
				return
			}
	
			if (!input.temperaments.includes(selectedTemperament)) {
			
				const fieldErrors = validation({ 
					...input, 
					[event.target.name]: selectedTemperament 
				});
	
				setInput({
				...input,
				temperaments: [...input.temperaments, selectedTemperament],
				});
			
				setErrors((prevErrors) => ({
					...prevErrors,
					...fieldErrors,
					temperaments: '',
				}));
		   }else{
			  alert('The temperament is already in the list')
		   }
	
	
	};

	const deleteTemperament = (temperamentToDelete) => {
		const filteredTemperaments = input.temperaments.filter((temperament) => temperament !== temperamentToDelete);
		setInput({
		  ...input,
		  temperaments: filteredTemperaments
		});

		setErrors({
			...errors,
			temperaments: filteredTemperaments.length === 0 ? 'You must select at least one temperament' : '',
		});
		document.getElementById('selectTemperaments').selectedIndex = 0;
	};

	const addDog = dog => dispatch( createDogBreed(dog));

	const handleSubmit = async(event) => {
		event.preventDefault();
		addDog({
			name: input.name,
			height: `${input.heightMin} - ${input.heightMax} cm`,
			weight: `${input.weightMin} - ${input.weightMax}`,
			life_span: `${input.lifeSpanMin} - ${input.lifeSpanMax} years`,
			image: input.image,
			temperaments: input.temperaments
		})
	}

	// const isSubmitButtonDisabled = Object.values(errors).some(error => error !== '');
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

	const temperamentsOptions = temperaments.map((temperament) => (
		<option key={temperament.id} value={temperament.name}>{temperament.name}</option>
	))

	

	return ( 
		<div className="form-container">
			<h2 className="form-title">Add New Dog Breed</h2>
			<form className='form' onSubmit={handleSubmit}>
				<p>{error}</p>
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
						<div className="error-message">
						{errors.image && <p>{errors.image}</p>}
						</div>
				</div>

				<div className="form-group">
					<label >Temperaments</label>
					<select
						id='selectTemperaments'
						onChange={handleSelect}
					>
						<option value="">Elegir temperamento/s</option>
								{temperamentsOptions}
					</select>
					<div className="error-message">
						{errors.temperaments && <p>{errors.temperaments}</p>}
					</div>
							<div className="temperaments">
								<ul>
									{
										input.temperaments.map((item, i) => (
											<li key={i}>
											{item}{'   '}
											<span
												onClick={() => deleteTemperament(item)}
												className="delete-icon"
											>
												X
											</span>
											</li>
										))
									}
								</ul>
							</div>
							{loading && <Loader />} 
							{error && <div className='error-message'>{error}</div>}
				</div>

				<button disabled={diseableHandler()} type="submit" className='button'>SAVE</button>
			</form>
		</div>
	);
};


export default AddDogForm;