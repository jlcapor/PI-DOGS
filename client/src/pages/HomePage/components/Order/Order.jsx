import React, { useState } from 'react';
import './order.css';
const Order = (props) => {
	const [select, setSelect] = useState(' ');
	return (
			<div className='order'>
				<div className='order-header'>
					<span className='order-label'>Order </span>
				</div>
				<select 
				    onChange={props.handlerSortWeight} 
					value={select}
				>
					<option value=''>Sort by Weight</option>
					<option Value="Min">Min - Max</option>
					<option Value="Max">Max - Min</option>
				</select> 

				<select 
					onChange={props.handleSortBreed}
					value={select}
				>
					<option value=''>In alphabetical order</option>
					<option value="A">A - Z</option>
					<option value="D">Z - A</option>
				</select> 
			</div>
	);
};

export default Order;