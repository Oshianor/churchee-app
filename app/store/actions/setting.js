import {
  CHANGE_MODE,
  CHANGE_FONT_SIZE,
  CHANGE_BASE_COLOR,
  TOGGLE_HOME_SECTIONS,
} from '../types';

const toggleHomeSection = (val) => {
  return {
    type: TOGGLE_HOME_SECTIONS,
    payload: val,
  };
};

const changeMode = (mode) => {
  console.log('modemodemode', mode);

  return {
    type: CHANGE_MODE,
    payload: mode,
  };
};


const changeFontSize = (val) => {
  return {
    type: CHANGE_FONT_SIZE,
    payload: val,
  };
};

const changeBaseColor = (val) => {
  return {
    type: CHANGE_BASE_COLOR,
    payload: val,
  };
};

export default {
  changeMode,
  changeFontSize,
  changeBaseColor,
  toggleHomeSection,
};