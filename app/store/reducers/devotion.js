import {DEVOTION_DATA} from '../types';

const initialstate = {
  data: [],
  page: 0,
  total: 0,
};

export default (state = initialstate, action) => {
  switch (action.type) {
    case DEVOTION_DATA:
      return Object.assign({}, state, {
        ...action.payload,
      });
    default:
      return state;
  }
};
