import {  useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { clearDogBreedDetail, getDogDetail } from '../../redux/actions/dogActions';
import {  useParams } from 'react-router-dom';
import './DogDetail.styles.css';
import Spinner from '../../components/Spinner/Spinner';

const DogDetail = () => {
	const dispatch = useDispatch();
	const { id } = useParams();
	const { dogBreedDetail, loading } = useSelector((state) => state.dogReducer);
	
	useEffect(() => {
		dispatch(getDogDetail(id));
	  	return () => {
			dispatch(clearDogBreedDetail())
	   	};
	}, [id]);
	console.log(dogBreedDetail)
	return (
		<div className='detail-container'>
			{loading ? (
				<Spinner/>
			): dogBreedDetail && dogBreedDetail.id ? (
				<div className = "card-detail">
				<div className ="wrap-image">
					<img src={dogBreedDetail.image} alt={ dogBreedDetail.name }/>
				</div>
				<div className="description">
				<h3>{ dogBreedDetail.name }</h3>
				<div></div>
				<ul>
					<li><strong>ID: {dogBreedDetail.id}</strong></li>
					<li><strong>Height: {`${dogBreedDetail.height} cm`}</strong></li>
					<li><strong>Weight : {`${dogBreedDetail.weight} Kgs`}</strong></li>
					<li><strong>Temperament: {dogBreedDetail.temperament}</strong></li>
					<li><strong>Life Span: {dogBreedDetail.life_span}</strong></li>
				</ul>
				
				</div>
				</div>
			):(
				<p className='centered-message'>The dog breed with ID {id} was not found.</p>
			)}
			
		</div>
	  );
	};

export default DogDetail;