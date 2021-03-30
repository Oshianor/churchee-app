import {EVENT_DATA, EVENT_CURRENT_PAGE} from '../types';

const initialstate = {
  data: [],
  page: 0,
  total: 0,
  currentPage: 1
};

export default (state = initialstate, action) => {
  switch (action.type) {
    case EVENT_DATA:
      return Object.assign({}, state, {
        ...action.payload
      });
    case EVENT_CURRENT_PAGE:
      return Object.assign({}, state, {
        currentPage: action.payload
      });
    default:
      return state;
  }
};
