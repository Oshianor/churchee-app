import {BIBLE_BOOKS, SELECTED_BOOK, SELECTED_CHAPTER, SELECTED_VERSE} from '../types';

const initialstate = {
  books: null,
  bookId: null,
  chapterId: null,
  verseId: null
};

export default (state = initialstate, action) => {
  switch (action.type) {
    case BIBLE_BOOKS:
      return Object.assign({}, state, {
        books: action.payload,
      });
    case SELECTED_BOOK:
      return Object.assign({}, state, {
        bookId: action.payload,
      });
    case SELECTED_CHAPTER:
      return Object.assign({}, state, {
        chapterId: action.payload,
      });
    case SELECTED_VERSE:
      return Object.assign({}, state, {
        verseId: action.payload,
      });
    default:
      return state;
  }
};
