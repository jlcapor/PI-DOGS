import React, { useState } from 'react';
import './filter.css';
import { useStore } from 'react-redux';

const Filter = (props) => {
	const [select, setSelect] = useState('');
	return (
		       <div>
			       <div className='filter'>
						<div className='filter-header'>
							<span className='filter-label'>Filter</span>
						</div>
						<select value={select} onChange={props.handleFilterTemperament} className="custom-select">
							<option value="">Elegir temperamento/s</option>
							{props.allTemperaments && props.allTemperaments.map((tem)=>(
							 <option key={tem.id} value={tem.name}>{tem.name}</option>
							))}
						</select>
						<select value={select} onChange={props.handleFilterBdOrApi} className="custom-select">
							<option value="">Origin</option>
							<option value='Existing'>API</option>
							<option value="Created">Database</option>
							<option value="All">All</option>
						</select> 
						
			        </div>
        			
		        </div>
		
	);
};


export default Filter;