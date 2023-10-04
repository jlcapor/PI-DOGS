import React from 'react';
import './Order.css';

const Order = (props) => {
	return (
			<div className='order'>
				<span className='order-label'>Order:</span>
				<select onChange={props.handlerSortWeight} >
					<option disabled selected>Sort by Weight</option>
					<option Value="Min">A - Z</option>
					<option Value="Max">Z - A</option>
				</select> 

				<select onChange={props.handleSortBreed}>
					<option disabled selected>In alphabetical order</option>
					<option value="A">Asc</option>
					<option value="D">Desc</option>
				</select> 
			</div>
	);
};

export default Order;