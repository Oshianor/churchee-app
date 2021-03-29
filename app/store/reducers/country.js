import {COUNTRY_DATA} from '../types';

const initialstate = {
  country: [],
  state: [],
  selectedCountry: null,
  selectedState: null
};

export default (state = initialstate, action) => {
  switch (action.type) {
    case COUNTRY_DATA:
      return Object.assign({}, state, {
        ...action.payload,
      });
    default:
      return state;
  }
};
