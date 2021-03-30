import {UPDATE_CHAT_DATA} from '../types';

const setChat = (payload) => {
  return {
    type: UPDATE_CHAT_DATA,
    payload,
  };
};


export default {
  setChat,
};
