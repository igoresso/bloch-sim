import { UPDATE, SIMULATE, ESTIMATE_PROFILE, CLEAR, RESET } from '../../actions/types';
import initialState from './initialState';
import update from './update';
import simulate from './simulate';
import estimateProfile from './estimateProfile';

const simulatorReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE:
      return update(state, action.payload);
    case SIMULATE:
      return simulate(state);
    case ESTIMATE_PROFILE:
      return estimateProfile(state);
    case CLEAR:
        return {
          params: { ...state.params },
          output: {
            ...state.output,
            ...{ 
              Mx_vec: [],
              My_vec: [],
              Mxy_vec: [],
              Mz_vec: [],
              z_vec: [],
              SPx_vec: [],
              SPy_vec: [],
              SPxy_vec: [],
              SPz_vec: []
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