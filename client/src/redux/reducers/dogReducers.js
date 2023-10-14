import { 
    GET_DOGS_REQUEST,
    GET_DOGS_SUCCESS ,
    GET_DOGS_FAIL,
    GET_DOG_DETAILS_REQUEST,
    GET_DOG_DETAILS_SUCCESS ,
    GET_DOG_DETAILS_FAIL,
    CREATE_DOG_REQUEST,
    CREATE_DOG_SUCCESS,
    CREATE_DOG_FAIL,

    GET_DOG_EDIT,
    DOG_EDIT_REQUEST,
    DOG_EDIT_SUCCESS,
    DOG_EDIT_FAIL,
    DOG_DELETE_REQUEST,
    DOG_DELETE_SUCCESS,
    DOG_DELETE_FAIL,
    GET_BY_NAME_REQUEST,
    GET_BY_NAME_SUCCESS,
    GET_BY_NAME_FAIL,
    CLEAR_DETAIL, 
    FILTER_CREATE_BD_API, 
    FILTER_BY_TEMPERAMENT,
    ORDER_BY_WEIGHT_MAX, 
    ORDER_BY_WEIGHT_MIN, 
    ORDER_FOR_NAME_AZ,
    ORDER_FOR_NAME_ZA,
    RESET,
    FILTER_TEMPERAMENT
} from "../actions-type/dogConstants"

const initialState ={
    allDogs:[],
    error: null,
    loading: false, 
    dogsCopy: [],
    filteredDogs:[],
    dogBreedDetail:{},
    dogDelete: null,
    dogEdit: null
}

const dogReducer = (state = initialState , action) => {
    switch(action.type){
        case GET_DOGS_REQUEST:
            return {
				...state,
				loading: true,
			};
        case GET_DOGS_SUCCESS:
            return {
                ...state,
				loading: false,
                error: null,
                success:false,
				allDogs : action.payload,
                dogsCopy: action.payload,
                filteredDogs: action.payload,
            };
        case GET_DOGS_FAIL :
            return {
                ...state,
				loading: false,
				error: action.payload,
            };

        case GET_DOG_DETAILS_REQUEST:
            return {
				...state,
				loading: true,
			};
        case GET_DOG_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                dogBreedDetail: {...action.payload}
            };
        case GET_DOG_DETAILS_FAIL:
            return {
                ...state,
				loading: true,
				error: action.payload,
            };
            
        case CLEAR_DETAIL:
            return {
                ...state,
                dogBreedDetail:{}
            };
       
        case GET_BY_NAME_REQUEST:
            return {
                ...state,
				loading: true,
            };
        case GET_BY_NAME_SUCCESS:

            return {
                ...state,
                loading: false,
                allDogs : action.payload,
                filteredDogs: action.payload
            };
        case GET_BY_NAME_FAIL:
            return {
                ...state,
                loading: true,
				error: action.payload,
            };
        
        case CREATE_DOG_REQUEST:
            return{
                ...state,
                success: false,
				loading: action.payload,
            };
        case CREATE_DOG_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                error: null,
                allDogs: [...state.allDogs, action.payload],
            };
        case CREATE_DOG_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                error: action.payload,
            };

       
            return {
                ...state,
                dogEdit: action.payload
            };
        
        case GET_DOG_EDIT:
            return {
                ...state,
                dogEdit: action.payload
            };
        case DOG_EDIT_SUCCESS:
            if (!action.payload || !action.payload.id) {
                return {
                    ...state,
                    dogEdit: null,
                };
            }
            const editAllDogs = state.allDogs.map(dog => (dog.id === action.payload.id ? action.payload : dog));
            const editDogsCopy = state.dogsCopy.map(dog => (dog.id === action.payload.id ? action.payload : dog));
            return {
                ...state,
                dogEdit: null,
                allDogs: editAllDogs,
                dogsCopy: editDogsCopy
            };
        
        case DOG_DELETE_REQUEST:
           return {
            ...state,
            dogDelete: action.payload
           };
        case DOG_DELETE_SUCCESS:
            const updatedDogs = state.allDogs.filter((dog) => dog.id !== state.dogDelete);
            const updatedDogsCopy = state.dogsCopy.filter((dog) => dog.id !== state.dogDelete);
            return {
                ...state,
                allDogs: updatedDogs,
                dogsCopy: updatedDogsCopy,
                dogDelete: null
            };
        case DOG_DELETE_FAIL:
        
        case FILTER_CREATE_BD_API:
            const allDogsFiltered = state.dogsCopy.filter((dog) =>dog.created === action.payload)
            return{
                ...state,
                allDogs: allDogsFiltered,
                filteredDogs: allDogsFiltered
            };
        case FILTER_BY_TEMPERAMENT:
            const filterTemperament = state.filteredDogs.filter(dog => {
                if (!dog.temperament) return null;
                return dog.temperament.includes(action.payload)
            });
            return {
                ...state,
                allDogs: filterTemperament,
            };
         

        case ORDER_FOR_NAME_AZ:
            const allDogsCopyAsc = [...state.allDogs];
            const resultAsc = allDogsCopyAsc.sort((a, b)=>{
                if (a.name > b.name) return 1;
                if (a.name < b.name) return -1;
                return 0;
            });
            return {
                ...state,
                allDogs: resultAsc
            };
        case ORDER_FOR_NAME_ZA:
            const allDogsCopyDesc = [...state.allDogs];
            const resultDesc = allDogsCopyDesc.sort((a, b)=>{
                if (a.name > b.name) return -1;
                if (a.name < b.name) return 1;
                return 0;
            });

            return {
                ...state,
                allDogs: resultDesc
            };
        case ORDER_BY_WEIGHT_MIN:
            const resultsMin = state.allDogs.sort((a, b) => {
                const weightA = a.weight.split(" - ").map(Number);
                const weightB = b.weight.split(" - ").map(Number);
            
                if (weightA[0] !== weightB[0]) {
                    return weightA[0] - weightB[0];
                } else {
                    return weightA[1] - weightB[1];
                }
            });

            return {
                ...state,
                allDogs: [...resultsMin]
            };

        case ORDER_BY_WEIGHT_MAX:
          const resultsMax = state.allDogs.sort((a, b) => {
                const weightA = a.weight.split(" - ").map(Number); 
                const weightB = b.weight.split(" - ").map(Number);

                if (weightB[0] !== weightA[0]) {
                    return weightB[0] - weightA[0];
                } else {
                    return weightB[1] - weightA[1];
                }
            });
            return {
                ...state,
                allDogs: [...resultsMax]
            };
        case RESET:
            return {
                ...state,
                allDogs: state.dogsCopy,
                filteredDogs: state.dogsCopy
            };
        case  FILTER_TEMPERAMENT:
            return{
                ...state,
                filteredDogs: [...action.payload]
            }
        default:
            return {...state}
    }
}

export default dogReducer