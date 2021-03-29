import {
  UPDATE_AUTH_TOKEN,
  UPDATE_USER_DATA,
  UPDATE_ACCOUNT_DATA
} from '../types';

const setToken = (token) => {
  return {
    type: UPDATE_AUTH_TOKEN,
    payload: token,
  };
};

// update user data
const setUserData = (user) => {
  return {
    type: UPDATE_USER_DATA,
    payload: user,
  };
};

const setAccountData = (payload) => {
  return {
    type: UPDATE_ACCOUNT_DATA,
    payload,
  };
};


export default {
  setToken,
  setUserData,
  setAccountData,
};
