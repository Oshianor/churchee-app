import {COUNTRY_DATA} from '../types';

// themes action
const setCountry = payload => ({
  type: COUNTRY_DATA,
  payload,
});

export default {
  setCountry,
};