import { useState } from 'react';
import './searchBar.styles.css';

const SearchBar = ({temperaments, onSearch, handleFilterTemperament}) => {

	const [name, setName] = useState ('');

	const temperamentsOptions = temperaments.map((temperament) => (
		<option key={temperament.id} value={temperament.name}>{temperament.name}</option>
	))
	const handleChange = (event) => {
		setName(event.target.value);
	};

	return (
		<div className='searchbar-box'>
		  <input 
				type="search"
				onChange={handleChange}
				value={name}
				className="search-input" 
				placeholder="search ..."
			/>
		  <button 
			 onClick={()=>{onSearch(name); setName('');}} 
			 className="button--submit"
		   >
			Search
		  </button>

			<select  onChange={handleFilterTemperament} className="select-input">
				<option value=''>Choose temperament/s</option>
				{temperamentsOptions}
			</select>
		</div>
	);
};
export default SearchBar;