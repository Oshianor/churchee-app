import {COUNTRY_DATA, STATE_DATA} from '../types';

const initialstate = {
  country: [],
  state: [],
};

export default (state = initialstate, action) => {
  switch (action.type) {
    case COUNTRY_DATA:
      return Object.assign({}, state, {
        country: action.payload,
      });
    case STATE_DATA:
      return Object.assign({}, state, {
        state: action.payload,
      });
    default:
      return state;
  }
};
