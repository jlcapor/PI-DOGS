import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import validation from '../../helpers/validation';
import { useNavigate } from 'react-router-dom';
import { editDogAction } from '../../redux/actions/dogActions';

const EditDogForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch ();
  const {temperaments} = useSelector((state) => state.temperamentReducers);
  const { dogEdit } = useSelector(state => state.dogReducer);
  console.log(dogEdit)
  const [input, setInput] = useState({
	id:'',
    name: '',
    heightMin: '',
    heightMax: '',
    weightMin: '',
    weightMax: '',
    lifeSpanMin: '',
    lifeSpanMax: '',
    image: '',
    temperaments: []
  });

  const [errors, setErrors] = useState({
    name: '',
    heightMin: '',
    heightMax: '',
    weightMin: '',
    weightMax: '',
    lifeSpanMin: '',
    lifeSpanMax: '',
    image: '',
    temperaments: ''
  });

  const extractNumbers = (value) => value.split(/\D+/).map(part => part.trim());

  const getDog = (dog) => {
	
		const heightParts = extractNumbers(dogEdit.height) || [];
		const weightParts = extractNumbers(dogEdit.weight) || [];
		const lifeSpanParts = extractNumbers(dogEdit.life_span) || [];
		setInput({
			...input,
			id: dogEdit.id || '',
			name : dogEdit.name || '',
			heightMin: heightParts[0] || '',
			heightMax: heightParts[1] || '',
			weightMin: weightParts[0] || '',
			weightMax: weightParts[1] || '',
			lifeSpanMin: lifeSpanParts[0] || '',
			lifeSpanMax: lifeSpanParts[1] || '',
			image: dogEdit.image || '',
			temperaments: dogEdit.temperament.split(',').map(temp => temp.trim()),
		})
	
  }

  	useEffect(() => {
		if (!dogEdit) {
			navigate('/dogs/home');
		} else {
			getDog(dogEdit);
		}
  	}, [dogEdit, navigate]);

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

	const submitEditDog = event => {
		event.preventDefault();
			dispatch(editDogAction({
				id:input.id,
				name: input.name,
				height: `${input.heightMin} - ${input.heightMax}`,
				weight: `${input.weightMin} - ${input.weightMax}`,
				life_span: `${input.lifeSpanMin} - ${input.lifeSpanMax} years`,
				image: input.image,
				temperaments: input.temperaments
			})
		);
	}

  	const temperamentsOptions = temperaments.map((temperament) => (
		<option key={temperament.id} value={temperament.name}>{temperament.name}</option>
	))
  return (
    <div>
      <div className="form-container">
			<h2 className="form-title">Update Dog Breed</h2>
			<form className='form' onSubmit={submitEditDog}>
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
							<option value=''>Choose temperament/s</option>
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
						
				</div>

				<button  disabled={diseableHandler()} type="submit" className='button'>UPDATE</button>
			</form>
		</div>
    </div>
  );
}

export default EditDogForm;
