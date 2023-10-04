import { 
    CLEAR_DETAIL, 
    FILTER_CREATE, 
    GET_BY_NAME, 
    GET_DOGS, 
    GET_DOG_DETAIL, 
    NEW_DOG_BREED,
    REMOVE_DOG_BREED,
    FILTER_BY_TEMPERAMENT,
    ORDER_BY_WEIGHT_MAX, 
    ORDER_BY_WEIGHT_MIN, 
    ORDER_FOR_NAME_ASC,
    ORDER_FOR_NAME_DESC,
    RESET
} from "../constants/dogConstants"

const initialState ={
    allDogs:[],
    dogsCopy: [],
    dogBreedDetail: {}
}

const dogReducer = (state = initialState , action) => {
    switch(action.type){
        case GET_DOGS:
            return {
                ...state,
                allDogs : action.payload,
                dogsCopy: action.payload,
            }
        case NEW_DOG_BREED:
            return {
                ...state,
                allDogs:[...action.payload]
            }

        case REMOVE_DOG_BREED:
            return{
                ...state,
                allDogs: action.payload,
                dogsCopy: action.payload,
            
            }
        case GET_BY_NAME:
            return {
                ...state,
                allDogs : action.payload,
            }

        case GET_DOG_DETAIL:
            return {
                ...state,
                dogBreedDetail: {...action.payload}
            }
        case CLEAR_DETAIL:
            return {
                ...state,
                dogBreedDetail:{}
            }
        case FILTER_CREATE:
            const allDogsFiltered = state.dogsCopy.filter((dog) =>dog.created === action.payload)
            return{
                ...state,
                allDogs: allDogsFiltered
            }
        case FILTER_BY_TEMPERAMENT:
            const filterTemperament = state.dogsCopy.filter(dog => {
                if (!dog.temperament) return null;
                return dog.temperament.includes(action.payload)
            })

            return {
                ...state,
                allDogs: filterTemperament
            }

        case ORDER_FOR_NAME_ASC:
            const allDogsCopyAsc = [...state.dogsCopy];
            const resultAsc = allDogsCopyAsc.sort((a, b)=>{
                if (a.name > b.name) return 1;
                if (a.name < b.name) return -1;
                return 0;
            });
            return {
                ...state,
                allDogs: resultAsc
            }
        case ORDER_FOR_NAME_DESC:
            const allDogsCopyDesc = [...state.dogsCopy];
            const resultDesc = allDogsCopyDesc.sort((a, b)=>{
                if (a.name > b.name) return -1;
                if (a.name < b.name) return 1;
                return 0;
            });

            return {
                ...state,
                allDogs: resultDesc
            }
        case ORDER_BY_WEIGHT_MIN:
            const resultsMin = state.dogsCopy.sort((a, b) => {
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
            }

        case ORDER_BY_WEIGHT_MAX:
          const resultsMax = state.dogsCopy.sort((a, b) => {
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
            }
        case RESET:
            return {
                ...state,
                allDogs: state.dogsCopy
            }

        default:
            return {...state}
    }
}

export default dogReducer