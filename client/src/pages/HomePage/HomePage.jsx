import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { 
	searchDogBreedByName, 
	getDogBreeds, 
	orderByWeightMin,
	orderByWeightMax,
	orderByNameAsc,
	orderByNameDesc,
	filterCreate,
	filterByTemperament,
	resetDogs,
	removeDogBreed,
} from '../../redux/actions/dogActions';
import SearchBar from '../../components/SearchBar/SearchBar';
import DogList from '../../components/DogList/DogList';
import Pagination from '../../components/Pagination/Pagination';
import Filter from './components/Filter/Filter';
import Order from './components/Order/Order';
import { getAllTemperaments } from '../../redux/actions/temperamentActions';
import Spinner from '../../components/Spinner/Spinner';

const HomePage = () => {
	const dispatch  = useDispatch();
	const {allDogs, loading, error} = useSelector((state) => state.dogReducer);
	const {temperaments} = useSelector((state) => state.temperamentReducers);

	useEffect(() => {
		dispatch(getDogBreeds())
		dispatch(getAllTemperaments())
	}, [dispatch]);

	const totalDogs = allDogs.length;

	const [currentPage, setCurrentPage] = useState(1);
	const [dogPerPage] = useState(8);
	const indexOfLastItem = currentPage * dogPerPage; 
	const indexOfFirstItem = indexOfLastItem - dogPerPage;
	const filterDogs = allDogs.slice(indexOfFirstItem, indexOfLastItem);


	
	const onSearch = (name) =>{
		dispatch(searchDogBreedByName(name))
		setCurrentPage(1);
	}

	const handleFilterTemperament = (event) =>{
		dispatch(filterByTemperament(event.target.value))
		setCurrentPage(1);
	}

	const handleFilterBdOrApi = (event) => {
		//const created = event.target.value === "Created" ? true : false
		const created = event.target.value;
		
		if(created === "Created"){
			dispatch(filterCreate(true));
			setCurrentPage(1);
		}else if(created === "Existing"){
			dispatch(filterCreate(false));
			setCurrentPage(1);
		}else if(created === 'All'){
			dispatch(resetDogs())
			setCurrentPage(1);
		}
	};


	const handleSortBreed = (event) => {
		event.preventDefault ();
		if(event.target.value === 'A'){
			dispatch(orderByNameAsc());
			setCurrentPage(1);
		}else if(event.target.value === 'D'){
			dispatch(orderByNameDesc());
			setCurrentPage(1);
		}
		
	}
	const handlerSortWeight = (event) =>{
		event.preventDefault ();
		if(event.target.value == "Min"){
			dispatch(orderByWeightMin());
			setCurrentPage(1);
		}else if(event.target.value == "Max"){
			dispatch(orderByWeightMax());
			setCurrentPage(1);
		}
		
	}

  
	return (
		<div> 
			<SearchBar onSearch={onSearch}/>
			<Order 
				handlerSortWeight={handlerSortWeight} 
				handleSortBreed={handleSortBreed}
			/>
			
			<Filter
			   allTemperaments={temperaments}
			   handleFilterTemperament = {handleFilterTemperament}
			   handleFilterBdOrApi={handleFilterBdOrApi}
			/>
			<br/>
			{!loading && totalDogs > 0 && (
				<Pagination 
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
					totalDogs={totalDogs}
					dogPerPage={dogPerPage}
				/>
			)}

			{loading ? (
				<Spinner/>
			): error ? (
				<div>{error}</div>
			):(
				<DogList 
					filterDogs={filterDogs}
				/>
			)}
			
		</div>
	);
};


export default HomePage;