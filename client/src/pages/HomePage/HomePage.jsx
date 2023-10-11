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
			
			{loading ? (
				<Spinner/>
			): error ? (
				<div>{error}</div>
			):(
				<DogList 
					filterDogs={filterDogs}
				/>
			)}

			{!loading && totalDogs > 0 && (
				<Pagination 
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
					totalDogs={totalDogs}
					dogPerPage={dogPerPage}
				/>
			)}

		</div>
	);
};


export default HomePage;