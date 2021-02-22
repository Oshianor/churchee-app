import {
  BIBLE_BOOKS,
  SELECTED_BOOK,
  SELECTED_CHAPTER,
  SELECTED_VERSE,
  HOMEPAGE,
	SET_HEADERS
} from '../types';


export const setHomePage = (value) => {
	return {
		type: HOMEPAGE,
		payload: value
  };
}

const updateBooks = (books) => {
	return {
		type: BIBLE_BOOKS,
		payload: books
  };
}

const setBook = (books) => {
	return {
		type: SELECTED_BOOK,
		payload: books
  };
}

const setChapter = (books) => {
	return {
		type: SELECTED_CHAPTER,
		payload: books
  };
}

const setVerse = (books) => {
	return {
		type: SELECTED_VERSE,
		payload: books
  };
}

const setHeader = (data) => {
	return {
		type: SET_HEADERS,
		payload: data
	}
}

export default {
	updateBooks,
	setBook,
	setChapter,
	setVerse
};