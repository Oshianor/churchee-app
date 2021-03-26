import {EVENT_DATA, EVENT_CURRENT_PAGE} from '../types';

const setEvent = (payload) => ({
  type: EVENT_DATA,
  payload,
});

const setEventPage = (payload) => ({
  type: EVENT_CURRENT_PAGE,
  payload,
});

export default {
  setEvent,
  setEventPage,
};
