import {
  UPDATE_AUTH_TOKEN,
  UPDATE_AUTH_REFRESH_TOKEN,
  UPDATE_USER_DATA,
} from '../types';

const updateToken = (token) => {
  return {
    type: UPDATE_AUTH_TOKEN,
    payload: token,
  };
};

const updateRefreshToken = (token) => {
  return {
    type: UPDATE_AUTH_REFRESH_TOKEN,
    payload: token,
  };
};

// update user data
const updateUserData = (user) => {
  return {
    type: UPDATE_USER_DATA,
    payload: user,
  };
};

export default {
  updateToken,
  updateRefreshToken,
  updateUserData,
};
