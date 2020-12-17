import { combineReducers } from 'redux';
import simulatorReducer from './simulation';
import presentationReducer from './presentation';

const rootReducer = combineReducers({
  simulation: simulatorReducer,
  presentation: presentationReducer
});

export default rootReducer;
