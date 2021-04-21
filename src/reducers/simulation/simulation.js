import { 
  UPDATE,
  CALCULATE_MAGNETISATION,
  CALCULATE_PROFILE,
  CLEAR,
  RESET
} from '../../actions/types';
import initialState from './initialState';
import update from './update';
import calculateMagnetisation from './calculateMagnetisation';
import calculateProfile from './calculateProfile';

const simulatorReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE:
      return update(state, action.payload);
    case CALCULATE_MAGNETISATION:
      return calculateMagnetisation(state);
    case CALCULATE_PROFILE:
      return calculateProfile(state);
    case CLEAR:
        return {
          params: {
            ...state.params,
            ...{
              current_index: state.params.N_pulse-1
            }
          },
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