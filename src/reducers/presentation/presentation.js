import { TOGGLE_THEME } from '../../actions/types';
import initialState from './initialState';

const visualReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_THEME:
      return {...state, ...{isDark: !state.isDark}};
    default:
      return state;
  }
};

export default visualReducer;