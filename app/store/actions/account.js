import {
  UPDATE_AUTH_TOKEN,
  UPDATE_USER_DATA,
  UPDATE_CHURCH_DATA,
} from '../types';

const updateToken = (token) => {
  return {
    type: UPDATE_AUTH_TOKEN,
    payload: token,
  };
};

const updateChurchData = (data) => {
  return {
    type: UPDATE_CHURCH_DATA,
    payload: data,
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
  updateChurchData,
  updateUserData,
};
