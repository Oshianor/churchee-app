import {UPDATE_CHAT_DATA} from '../types';

const initialstate = {
  rooms: []
};

export default (state = initialstate, action) => {
  switch (action.type) {
    case UPDATE_CHAT_DATA:
      return Object.assign({}, state, {
        ...action.payload,
      });
    default:
      return state;
  }
};
