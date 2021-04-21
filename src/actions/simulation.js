import { 
  UPDATE,
  CALCULATE_MAGNETISATION,
  CALCULATE_PROFILE,
  CLEAR,
  RESET
} from './types';

export const update = variable => dispatch => {
  dispatch({
    type: UPDATE,
    payload: variable
  });
  return Promise.resolve();
};

export const calculateMagnetisation = () => dispatch => {
  dispatch({
    type: CALCULATE_MAGNETISATION,
  });
  return Promise.resolve();
}

export const calculateProfile = () => dispatch => {
  dispatch({
    type: CALCULATE_PROFILE,
  });
  return Promise.resolve();
}

export const simulate = () => dispatch =>
  dispatch(calculateMagnetisation())
    .then(() => dispatch(calculateProfile()));

export const clear = () => dispatch => {
  dispatch({
    type: CLEAR,
  });
  return Promise.resolve();
};

export const reset = () => dispatch => {
  dispatch({
    type: RESET,
  });
  return Promise.resolve();
};

