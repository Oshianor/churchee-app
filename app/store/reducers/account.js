import {
  UPDATE_AUTH_TOKEN,
  UPDATE_AUTH_REFRESH_TOKEN,
  UPDATE_USER_DATA,
  HOMEPAGE,
  DEVOTION_DATA,
  SET_HEADERS
} from '../types';

const initialstate = {
  token: null,
  header: null,
  live: null,
  devotion: [],
  sermon: [],
  event: [],
  prayer: [],
  media: null,
  hymn: [],
  refreshToken: null,
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
    case UPDATE_AUTH_REFRESH_TOKEN:
      return Object.assign({}, state, {
        refreshToken: action.payload,
      });
    case DEVOTION_DATA:
      return Object.assign({}, state, {
        devotionData: action.payload.devotion,
        devotionPage: action.payload.pages,
        devotionTotal: action.payload.total,
      });
    case HOMEPAGE:
      return Object.assign({}, state, {
        live: action.payload.live,
        devotion: action.payload.devotion,
        sermon: action.payload.sermon,
        event: action.payload.event,
        prayer: action.payload.prayerRequests,
        media: action.payload.media,
        hymn: action.payload.hymn,
      });
    case SET_HEADERS:
      return Object.assign({}, state, {
        header: action.payload === '' ? null : action.payload,
      });
    default:
      return state;
  }
};
