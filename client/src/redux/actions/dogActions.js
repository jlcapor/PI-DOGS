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
    DOG_DELETE_REQUEST,
    DOG_DELETE_SUCCESS,
    DOG_DELETE_FAIL,
    GET_BY_NAME_REQUEST,
    GET_BY_NAME_SUCCESS,
    GET_BY_NAME_FAIL,
    //? Fiter and Order
    CLEAR_DETAIL, 
    FILTER_CREATE_BD_API, 
    FILTER_BY_TEMPERAMENT,
    ORDER_BY_WEIGHT_MAX,
    ORDER_BY_WEIGHT_MIN,
    ORDER_FOR_NAME_AZ,
    ORDER_FOR_NAME_ZA,
    RESET,
} from "../actions-type/dogConstants";
import clienteAxios from "../../config/clienteAxios";

export const getDogBreeds = () => {
    return (dispatch) => {
        dispatch({ type: GET_DOGS_REQUEST});
        fetch('http://localhost:3001/dogs')
        .then((response) => response.json())
        .then (data=> dispatch({
            type:  GET_DOGS_SUCCESS,
            payload: data
        }))
        .catch(error =>dispatch({ 
            type: GET_DOGS_FAIL, 
            payload: error.response.data.error 
        }))
    }
}

export const createDogBreed = async(dogBreed) =>{
    return async (dispatch) => {
        try {
            dispatch({type: CREATE_DOG_REQUEST})
            const { data } = await clienteAxios.post('/dogs', dogBreed)
            return dispatch({
                type: CREATE_DOG_SUCCESS,
                payload: data
            })
        } catch (error) {
            dispatch({ 
                type: CREATE_DOG_FAIL, 
                payload: error.response.data.error
            })
        }
    }
}


export function getDogEdit(dog) {
    return (dispatch) => {
        dispatch( getDogEditAction(dog) )
    }
}

const getDogEditAction = dog => ({
    type: GET_DOG_EDIT,
    payload: dog
})


export const editDogAction = async(dog) =>{
    return async (dispatch) => {

    }
}
export const removeDogBreed = (dogId) => {
    const endpoint = `http://localhost:3001/dogs/${dogId}`;
    return async (dispatch) => {
      try {
        dispatch({type: DOG_DELETE_REQUEST})
        await clienteAxios.delete(endpoint);
        return dispatch({
            type: DOG_DELETE_SUCCESS,
            payload: dogId
        });
      } catch (error) {
        dispatch({
            type: DOG_DELETE_FAIL, 
            payload: error.response.data.error
        })
      }
    };
};


export const searchDogBreedByName = (name) => {
    return async (dispatch) =>{
       try {
            dispatch({type: GET_BY_NAME_REQUEST})
            const response = await clienteAxios.get(`/dogs?name=${name}`);
            return dispatch({
                type: GET_BY_NAME_SUCCESS,
                payload : response.data
            })
       } catch (error) {
        dispatch({
            type: GET_BY_NAME_FAIL, 
            payload: error.response.data.error
        })
       }
    }
}

export const getDogDetail=(id)=>{
    const endpoint =` http://localhost:3001/dogs/${id}`;
    return (dispatch) =>{
        dispatch({ type: GET_DOG_DETAILS_REQUEST});
        fetch(endpoint)
        .then((response) => response.json())
        .then (data=> dispatch({
            type:  GET_DOG_DETAILS_SUCCESS,
            payload: data
        }))
        .catch(error => dispatch({
            type:  GET_DOG_DETAILS_FAIL, 
            payload:error.response.data.error
        }))
    }
}

export const clearDogBreedDetail = () =>{
    return{
        type: CLEAR_DETAIL
    }
}

export const filterByTemperament = (temperament) => {
       return {
          type: FILTER_BY_TEMPERAMENT,
          payload: temperament
       }
    };

export const orderByWeightMin = () =>{
    return {
        type :ORDER_BY_WEIGHT_MIN
    }
}

export const orderByWeightMax = () =>{
    return {
        type :ORDER_BY_WEIGHT_MAX
    }
}

export const orderByNameAsc = (origin) =>{
    return {
        type :ORDER_FOR_NAME_AZ,
        payload: origin
    }
}


export const orderByNameDesc = () =>{
    return {
        type :ORDER_FOR_NAME_ZA
    }
}


export const filterCreate = (created) =>{
    return {
        type :FILTER_CREATE_BD_API,
        payload: created
    }
}


export const resetDogs = () =>{
    return {
        type : RESET
    }
}


