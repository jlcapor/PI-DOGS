import React from 'react';
import './filter.css';

const Filter = (props) => {

	return (
		<div>
			<div className='filter'>
				<div className='filter-header'>
					<span className='filter-label'>Filter:</span>
				</div>
					<select onChange={(event) =>props.handleFilterTemperament(event)}>
						<option disabled selected>Elegir temperamento/s</option>
						{props.temperaments && props.temperaments.map((tem)=>(
						<option key={tem.id} value={tem.name}>{tem.name}</option>
						))}
					</select>
					<select onChange={props.handleFilterBdOrApi} >
						<option disabled selected>Origin</option>
						<option value='Existing'>API</option>
						<option value="Created">Database</option>
						<option value="All">All</option>
					</select> 
			</div>
		</div>
		
	);
};


export default Filter;