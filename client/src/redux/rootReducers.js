import { combineReducers } from 'redux';
import dogReducer from './reducers/dogReducers';
import temperamentReducers from './reducers/temperamentReducers';
const rootReducers = combineReducers({
	dogReducer,
	temperamentReducers
});

export default rootReducers;