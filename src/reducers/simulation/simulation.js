import { UPDATE, SIMULATE, CLEAR, RESET } from '../../actions/types';
import initialState from './initialState';
import update from './update';
import simulate from './simulate';

const simulatorReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE:
      return update(state, action.payload);
    case SIMULATE:
      return simulate(state);
    case CLEAR:
        return {
          params: { ...state.params },
          output: {
            ...state.output,
            ...{ 
              M_vec: [] 
            }
          }
        }
    case RESET:
      return initialState;
    default:
      return state;
  }
};

export default simulatorReducer;