import {SERMON_DATA, SERMON_CURRENT_PAGE} from '../types';

const setSermon = (payload) => ({
  type: SERMON_DATA,
  payload,
});

const setSermonPage = (payload) => ({
  type: SERMON_CURRENT_PAGE,
  payload,
});

export default {
  setSermon,
  setSermonPage,
};
