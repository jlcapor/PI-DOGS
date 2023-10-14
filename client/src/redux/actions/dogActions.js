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
    //? Fiter and Order
    CLEAR_DETAIL, 
    FILTER_CREATE_BD_API, 
    FILTER_BY_TEMPERAMENT,
    ORDER_BY_WEIGHT_MAX,
    ORDER_BY_WEIGHT_MIN,
    ORDER_FOR_NAME_AZ,
    ORDER_FOR_NAME_ZA,
    RESET,
    FILTER_TEMPERAMENT
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

export const getTemperaments =  (value) =>{
    return async (dispatch) => {
        try {
            const {data} = await clienteAxios.get(`/temperaments/${value}`)
            return {
                type:FILTER_TEMPERAMENT,
                payload: data
            }
        } catch (error) {
            
        }
    }
}

export const createDogBreed = (dogBreed) =>{
    return async (dispatch) => {
        try {
            dispatch(addDog())
            await clienteAxios.post('/dogs', dogBreed)
            return dispatch(addDogSuccess(dogBreed))
        } catch (error) {
            dispatch(addDogError(error.response.data.error))
        }
    }
}

const addDog = () => ({
    type: CREATE_DOG_REQUEST,
    payload: true
});

const addDogSuccess = dog => ({
    type: CREATE_DOG_SUCCESS,
    payload: dog
})

const addDogError = error => ({
    type: CREATE_DOG_FAIL,
    payload: error
});



export function getDogEdit(dog) {
    return (dispatch) => {
        dispatch(getDogEditAction(dog))
    }
}

const getDogEditAction = dog => ({
    type: GET_DOG_EDIT,
    payload: dog
})

export function editDogAction(dog) {
    
    return async (dispatch) => {
        dispatch(editDog());
        try {
            const {data} = await clienteAxios.put(`/dogs/${dog.id}`, dog);    
            dispatch(editDogSuccess(dog));
        } catch (error) {
            dispatch(editDogError());
        }
    }
}

const editDog = () => ({
    type: DOG_EDIT_SUCCESS
});

const editDogSuccess = dog => ({
    type: DOG_DELETE_SUCCESS,
    payload: dog
});

const editDogError = () => ({
    type: DOG_DELETE_FAIL,
    payload: true
})


export const removeDogBreed = (dogId) => {
    const endpoint = `http://localhost:3001/dogs/${dogId}`;
    return async (dispatch) => {
      try {
        dispatch(getDogDelete(dogId))
        await clienteAxios.delete(endpoint);
        return dispatch(removeDogSuccess());
      } catch (error) {
        dispatch(removeDogError())
      }
    };
};

const getDogDelete = id => ({
    type: DOG_DELETE_REQUEST,
    payload: id
});
const removeDogSuccess = () => ({
    type: DOG_DELETE_SUCCESS
})
const removeDogError = () => ({
    type: DOG_DELETE_FAIL,
    payload: true
});


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


