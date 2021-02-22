import {
  DEVOTION_DATA,
} from '../types';

const initialstate = {
  data: [],
  page: 0,
  total: 0,
};

export default (state = initialstate, action) => {
  switch (action.type) {
    case DEVOTION_DATA:
      return Object.assign({}, state, {
        data: action.payload.devotion,
        page: action.payload.pages,
        total: action.payload.total,
      });
    default:
      return state;
  }
};
