import React from 'react';
import './Order.css';
const Order = (props) => {
	return (
			<div className='order'>
				<div className='order-header'>
					<span className='order-label'>Order </span>
				</div>
				<select onChange={props.handlerSortWeight} >
					<option>Sort by Weight</option>
					<option Value="Min">A - Z</option>
					<option Value="Max">Z - A</option>
				</select> 

				<select onChange={props.handleSortBreed}>
					<option>In alphabetical order</option>
					<option value="A">Asc</option>
					<option value="D">Desc</option>
				</select> 
			</div>
	);
};

export default Order;