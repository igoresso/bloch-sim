import { UPDATE, SIMULATE, CLEAR, RESET } from './types';

export const update = (variable) => {
  return {
    type: UPDATE,
    payload: variable
  };
};

export const simulate = () => {
  return {
    type: SIMULATE,
  };
};

export const clear = () => {
  return {
    type: CLEAR,
  };
};

export const reset = () => {
  return {
    type: RESET,
  };
};

