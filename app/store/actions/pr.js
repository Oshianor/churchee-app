import {PR_DATA, PR_CURRENT_PAGE} from '../types';

const setPR = (payload) => ({
  type: PR_DATA,
  payload,
});

const setPRPage = (payload) => ({
  type: PR_CURRENT_PAGE,
  payload,
});

export default {
  setPR,
  setPRPage,
};
