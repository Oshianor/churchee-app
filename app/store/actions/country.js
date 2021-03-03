import {COUNTRY_DATA, STATE_DATA} from '../types';

// themes action
const setCountry = payload => ({
  type: COUNTRY_DATA,
  payload,
});

const setState = (payload) => ({
  type: STATE_DATA,
  payload,
});


export default {
  setCountry,
  setState
};