import {MEDIA_DATA, MEDIA_CURRENT_PAGE} from '../types';

const initialstate = {
  data: [],
  page: 0,
  total: 0,
  currentPage: 1,
};

export default (state = initialstate, action) => {
  switch (action.type) {
    case MEDIA_DATA:
      return Object.assign({}, state, {
        data: action.payload.media,
        page: action.payload.pages,
        total: action.payload.total,
      });
    case MEDIA_CURRENT_PAGE:
      return Object.assign({}, state, {
        currentPage: action.payload,
      });
    default:
      return state;
  }
};
