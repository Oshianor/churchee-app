import {CHURCH_DATA} from '../types';

const initialstate = {
  searchedChurch: [],
  church: null,
  churchList: [],
  members: [],
  selectedMembers: [],
  selectedMembersIDs: [],
  isFilter: false
};

export default (state = initialstate, action) => {
  switch (action.type) {
    case CHURCH_DATA:
      return Object.assign({}, state, {
        ...action.payload
      });
    default:
      return state;
  }
};
