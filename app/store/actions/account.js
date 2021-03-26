import {
  UPDATE_AUTH_TOKEN,
  UPDATE_USER_DATA,
  UPDATE_CHURCH_DATA,
  UPDATE_USER_LOCATION,
  CHURCH_LIST_DATA,
  UPDATE_DATA
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

const churchListData = (data) => {
  return {
    type: CHURCH_LIST_DATA,
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


const setLocation = (user) => {
  return {
    type: UPDATE_USER_LOCATION,
    payload: user,
  };
};

const setAccountData = (payload) => {
  return {
    type: UPDATE_DATA,
    payload,
  };
};


export default {
  updateToken,
  updateChurchData,
  updateUserData,
  setLocation,
  churchListData,
  setAccountData,
};
