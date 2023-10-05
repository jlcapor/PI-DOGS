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
	resetDogs
} from '../../redux/actions/dogActions';
import SearchBar from '../../components/SearchBar/SearchBar';
import DogList from '../../components/DogList/DogList';
import Pagination from '../../components/Pagination/Pagination';
import Filter from './components/Filter/Filter';
import clienteAxios from '../../config/clienteAxios';
import Order from './components/Order/Order';

const HomePage = () => {
	const dispatch  = useDispatch();
	const allDogs = useSelector((state) => state.allDogs);
	const [temperaments, setTemperaments] = useState ([])

	useEffect(() => {
		dispatch(getDogBreeds())
	}, [dispatch]);

	useEffect(() => {
		const getTemperaments = async () => {
		  try {
			  const { data} = await clienteAxios.get('/temperaments')
			  console.log( data)
			  setTemperaments(data);
		  } catch (error) {
			  console.log(error)
		  }
		}
		getTemperaments()
	  }, []);


	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage] = useState(8);
	const indexOfLastItem = currentPage * itemsPerPage; 
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentItems = allDogs.slice(indexOfFirstItem, indexOfLastItem);


	const paginateHandler = (pageNumber) =>{
		setCurrentPage(pageNumber)
	}

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
		console.log(created)
		if(created === "Created"){
			dispatch(filterCreate(true));
			setCurrentPage(1);
		}else if(created === "Existing"){
			dispatch(filterCreate(false));
			setCurrentPage(1);
		}else{
			dispatch(resetDogs())
			setCurrentPage(1);
		}
	};


	const handleSortBreed = (event) => {
		event.preventDefault ();
		if(event.target.value === 'A'){
			dispatch(orderByNameAsc());
			setCurrentPage(1);
		}else{
			dispatch(orderByNameDesc());
			setCurrentPage(1);
		}
		
	}

	const handlerSortWeight = (event) =>{
		event.preventDefault ();
		if(event.target.value == "Min"){
			dispatch(orderByWeightMin());
			setCurrentPage(1);
		}else{
			dispatch(orderByWeightMax());
			setCurrentPage(1);
		}
		
	}

	const handlerUpdate=()=>{

	}

	const handlerDelete = (id) =>{

	}

	const newDogBreed = () => navigate("/dogs/new-dog");
	return (
		<div> 
			<SearchBar onSearch={onSearch}/>
			<Order 
				handlerSortWeight={handlerSortWeight} 
				handleSortBreed={handleSortBreed}
			/>
			<Filter
			   temperaments={temperaments}
			   handleFilterTemperament = {handleFilterTemperament}
			   handleFilterBdOrApi={handleFilterBdOrApi}
			/>
			<DogList 
			  currentItems={currentItems}
			  handlerDelete={handlerDelete}
			/>
			<Pagination 
			  itemsPerPage={itemsPerPage}
			  totalItems={allDogs.length}
			  paginateHandler={paginateHandler}
			  currentPage={currentPage}
			/>
			
		</div>
	);
};


export default HomePage;