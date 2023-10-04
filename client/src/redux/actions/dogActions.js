import { 
    CLEAR_DETAIL, 
    FILTER_CREATE, 
    GET_BY_NAME, GET_DOGS, 
    GET_DOG_DETAIL, 
    NEW_DOG_BREED, 
    REMOVE_DOG_BREED,
    FILTER_BY_TEMPERAMENT,
    ORDER_BY_WEIGHT_MAX,
    ORDER_BY_WEIGHT_MIN,
    ORDER_FOR_NAME_ASC,
    ORDER_FOR_NAME_DESC,
    RESET
} from "../constants/dogConstants";
import clienteAxios from "../../config/clienteAxios";


export const getDogBreeds = () => {
    const endpoint = 'http://localhost:3001/dogs';
    return (dispatch) => {
        fetch(endpoint)
        .then((response) => response.json())
        .then (data=> dispatch({
            type: GET_DOGS,
            payload: data
        }))
    }
}

export const newDogBreed = (dogBreed) => {
    return  async (dispatch) =>{
        const response = await clienteAxios.post('/dogs', dogBreed);
        return dispatch({
            type: NEW_DOG_BREED,
            payload : response.data
        })
    }
}

export const removeDogBreed = (id) => {
    const endpoint = "" + id;
    return async (dispatch) => {
      try {
        const {data} = await clienteAxios.delete(endpoint);
        return dispatch({
            type: REMOVE_DOG_BREED,
            payload: data,
        });
      } catch (error) {
        console.log(error);
      }
    };
  };

export const searchDogBreedByName = (name) => {
    return async (dispatch) =>{
       const response = await clienteAxios.get(`/dogs?name=${name}`);
       return dispatch({
        type: GET_BY_NAME,
        payload : response.data
      })
    }
}



export const getDogDetail=(id)=>{
    const endpoint =` http://localhost:3001/dogs/${id}`;
    return (dispatch) =>{
        fetch(endpoint)
        .then((response) => response.json())
        .then (data=> dispatch({
            type: GET_DOG_DETAIL,
            payload: data
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
        type :ORDER_FOR_NAME_ASC,
        payload: origin
    }
}


export const orderByNameDesc = () =>{
    return {
        type :ORDER_FOR_NAME_DESC
    }
}


export const filterCreate = (created) =>{
    return {
        type :FILTER_CREATE,
        payload: created
    }
}


export const resetDogs = () =>{
    return {
        type : RESET
    }
}


