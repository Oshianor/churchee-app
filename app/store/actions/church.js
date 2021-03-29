import {
  CHURCH_DATA
} from '../types';


const setChurchData = (payload) => {
  return {
    type: CHURCH_DATA,
    payload,
  };
};


export default {
  setChurchData,
};
