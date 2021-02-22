import {MEDIA_DATA, MEDIA_CURRENT_PAGE} from '../types';

const setMedia = (data) => {
  return {
    type: MEDIA_DATA,
    payload: data,
  };
};
const setMediaPage = (payload) => ({
  type: MEDIA_CURRENT_PAGE,
  payload,
});

export default {
  setMedia,
setMediaPage
};
