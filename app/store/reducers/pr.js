import {PR_DATA, PR_CURRENT_PAGE} from '../types';

const initialstate = {
  data: [],
  page: 0,
  total: 0,
  currentPage: 1
};

export default (state = initialstate, action) => {
  switch (action.type) {
    case PR_DATA:
      return Object.assign({}, state, {
        data: action.payload.data,
        page: action.payload.page,
        total: action.payload.total,
      });
    case PR_CURRENT_PAGE:
      return Object.assign({}, state, {
        currentPage: action.payload
      });
    default:
      return state;
  }
};
