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
} from '../../redux/actions/dogActions';
import SearchBar from '../../components/SearchBar/SearchBar';
import DogList from '../../components/DogList/DogList';
import Pagination from '../../components/Pagination/Pagination';
import { getAllTemperaments } from '../../redux/actions/temperamentActions';
import Spinner from '../../components/Spinner/Spinner';
import styles from './HomePage.module.css';

const HomePage = () => {
	const dispatch  = useDispatch();

	const dogState = useSelector((state) => state.dogReducer);
	const { allDogs, loading, error } = dogState;

	const temperamentState = useSelector((state) => state.temperamentReducers);
	const { temperaments } = temperamentState;

	const [currentPage, setCurrentPage] = useState(1);
	const [dogPerPage] = useState(8);
	
	useEffect(() => {
		dispatch(getDogBreeds())
		dispatch(getAllTemperaments())
	}, [dispatch]);


	const totalDogs = Array.isArray(allDogs) ? allDogs.length : 0;
	
	const getFilteredDogs = () => {
		if (totalDogs === 0) {
		  return [];
		}
		const indexOfLastItem = currentPage * dogPerPage;
		const indexOfFirstItem = indexOfLastItem - dogPerPage;
		return allDogs.slice(indexOfFirstItem, indexOfLastItem);
	};

	const filterDogs = getFilteredDogs();
	

	const onSearch = (name) =>{
		dispatch(searchDogBreedByName(name))
		setCurrentPage(1);
	}

	const handleFilterTemperament = (event) =>{
		dispatch(filterByTemperament(event.target.value))
		setCurrentPage(1);
	}

	const handlerFilterAPI=()=>{
		dispatch(filterCreate(false));
		setCurrentPage(1);
	}


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

	const handlerFilterBD=()=>{
		dispatch(filterCreate(true));
		setCurrentPage(1);
	}

	const handleFilterBdOrApi = () =>{
		dispatch(resetDogs())
		setCurrentPage(1);
	}


	const renderContent = () => {
		if (loading) {
		  return <Spinner />;
		}
		if (error) {
		  return <div className={styles.message}>{error}</div>;
		}
		if (totalDogs === 0) {
		  return <div className={styles.message}>There are no dogs available.</div>;
		}
		return (
		  <div>
			<DogList filterDogs={filterDogs} />
			<Pagination
			  currentPage={currentPage}
			  setCurrentPage={setCurrentPage}
			  totalDogs={totalDogs}
			  dogPerPage={dogPerPage}
			/>
		  </div>
		);
	  };
  
	return (
		<div> 
			
			<SearchBar temperaments={temperaments} onSearch={onSearch}  handleFilterTemperament = {handleFilterTemperament}/>
			<div className={styles.opciones}>
				<div className={styles.orderHeader}>
					<span className={styles.orderLabel}>Opciones: </span>
				</div>
				<select onChange={handlerSortWeight}>
					<option value=''>Sort by Weight</option>
					<option Value="Min">Min - Max</option>
					<option Value="Max">Max - Min</option>
				</select> 

				<select onChange={handleSortBreed}>
					<option value=''>In alphabetical order</option>
					<option value="A">A - Z</option>
					<option value="D">Z - A</option>
				</select>
				<button onClick={handlerFilterAPI}>API</button>
				<button onClick={handlerFilterBD}>BD</button>
				<button onClick={handleFilterBdOrApi}>ALL</button>
			</div>
			
			{renderContent()}

		</div>
	);
};


export default HomePage;