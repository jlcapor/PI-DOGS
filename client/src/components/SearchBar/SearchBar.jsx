import { useState } from 'react';
import './searchBar.styles.css';

const SearchBar = ({onSearch}) => {

	const [name, setName] = useState ('');

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
		</div>
	);
};

// <button className="search-button">Buscar</button>
export default SearchBar;