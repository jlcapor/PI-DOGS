
import { GET_ALL_TEMPERAMENTS } from "../actions-type/temperamentConstants";
import clienteAxios from "../../config/clienteAxios";

export const getAllTemperaments = () => {
    return async(dispatch) => {
        try {
            const { data } = await clienteAxios.get('http://localhost:3001/temperaments');
            return dispatch({
                type:GET_ALL_TEMPERAMENTS,
                payload: data
            })
        } catch (error) {
            throw Error(error.response.data.error) 
        }
    }
  }