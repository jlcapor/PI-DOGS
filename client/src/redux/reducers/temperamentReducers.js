import { GET_ALL_TEMPERAMENTS } from "../actions-type/temperamentConstants"

const initialState ={
    temperaments: [],
}


const temperamentReducers = (state = initialState , action) => {
    switch(action.type){
        case GET_ALL_TEMPERAMENTS:
            return {
                ...state,
                temperaments: action.payload
            }
        default:
            return {...state}
    }
}

export default temperamentReducers