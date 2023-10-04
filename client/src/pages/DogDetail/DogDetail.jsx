import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { clearDogBreedDetail, getDogDetail } from '../../redux/actions/dogActions';
import {  useParams } from 'react-router-dom';
import './DogDetail.styles.css';

const DogDetail = () => {
	const dispatch = useDispatch();
	const { id } = useParams();

	const dogBreed = useSelector((state) => state.dogBreedDetail);
	
	useEffect(() => {
		dispatch(getDogDetail(id));
	  	return () => {
			dispatch(clearDogBreedDetail())
	   	};
	}, [id]);

	return (
		<div className='detail-container'>
			<div className = "card-detail">
				<div className ="wrap-image">
					<img src={dogBreed.image} alt={ dogBreed.name }/>
					<div className="button-container">
						{dogBreed.created && <button className="update-button">Update</button>}
    				</div>
				</div>
				<div className="description">
				<h3>{ dogBreed.name }</h3>
				<div></div>
				<ul>
					<li><strong>ID: {dogBreed.id}</strong></li>
					<li><strong>Height: {`${dogBreed.height} cm`}</strong></li>
					<li><strong>Weight : {`${dogBreed.weight} Kgs`}</strong></li>
					<li><strong>Temperament: {dogBreed.temperament}</strong></li>
					<li><strong>Life Span: {dogBreed.life_span}</strong></li>
				</ul>
				
				</div>
			</div>
			
		</div>
	  );
	};

export default DogDetail;