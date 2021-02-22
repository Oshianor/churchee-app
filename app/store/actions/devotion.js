import {DEVOTION_DATA} from '../types';

const setDevotion = (data) => {
  return {
    type: DEVOTION_DATA,
    payload: data,
  };
};

export default {
  setDevotion,
};
