import {
  UPDATE_AUTH_TOKEN,
  UPDATE_USER_DATA,
  UPDATE_ACCOUNT_DATA,
} from '../types';

const initialstate = {
  token: null,
  lat: 0,
  lng: 0,
  live: null,
  devotion: [],
  sermon: [],
  event: [],
  prayer: [],
  notes: [],
  hymn: [],
  media: null,
  user: null,
};

export default (state = initialstate, action) => {
  switch (action.type) {
    case UPDATE_USER_DATA:
      return Object.assign({}, state, {
        user: action.payload,
      });
    case UPDATE_AUTH_TOKEN:
      return Object.assign({}, state, {
        token: action.payload,
      });
    case UPDATE_ACCOUNT_DATA:
      return Object.assign({}, state, {
        ...action.payload,
      });
    default:
      return state;
  }
};
