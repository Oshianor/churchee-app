import {SERMON_DATA, SERMON_CURRENT_PAGE} from '../types';

const initialstate = {
  data: [],
  page: 0,
  total: 0,
  currentPage: 1
};

export default (state = initialstate, action) => {
  switch (action.type) {
    case SERMON_DATA:
      return Object.assign({}, state, {
        ...action.payload,
      });
    case SERMON_CURRENT_PAGE:
      return Object.assign({}, state, {
        currentPage: action.payload
      });
    default:
      return state;
  }
};
