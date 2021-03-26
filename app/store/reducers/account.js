import {
  UPDATE_AUTH_TOKEN,
  UPDATE_USER_DATA,
  UPDATE_DATA,
  DEVOTION_DATA,
  UPDATE_CHURCH_DATA,
  UPDATE_USER_LOCATION,
  CHURCH_LIST_DATA,
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
  media: null,
  hymn: [],
  user: null,
  church: null,
  churchList: [],
  members: [],
  selectedMembers: [],
  selectedMembersIDs: []
};

export default (state = initialstate, action) => {
  switch (action.type) {
    case UPDATE_USER_DATA:
      return Object.assign({}, state, {
        user: action.payload,
      });
    case UPDATE_USER_LOCATION:
      return Object.assign({}, state, {
        ...action.payload,
      });
    case UPDATE_CHURCH_DATA:
      return Object.assign({}, state, {
        church: action.payload,
      });
    case CHURCH_LIST_DATA:
      return Object.assign({}, state, {
        churchList: action.payload,
      });
    case UPDATE_AUTH_TOKEN:
      return Object.assign({}, state, {
        token: action.payload,
      });
    case DEVOTION_DATA:
      return Object.assign({}, state, {
        devotionData: action.payload.devotion,
        devotionPage: action.payload.pages,
        devotionTotal: action.payload.total,
      });
    case UPDATE_DATA:
      return Object.assign({}, state, {
        ...action.payload,
      });
    default:
      return state;
  }
};
