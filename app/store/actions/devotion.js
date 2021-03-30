import {DEVOTION_DATA} from '../types';

const setDevotion = (payload) => {
  return {
    type: DEVOTION_DATA,
    payload,
  };
};

export default {
  setDevotion,
};
