import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  Subheading,
  Searchbar,
  IconButton,
  ActivityIndicator,
} from 'react-native-paper';
import {View, StyleSheet, FlatList, TouchableOpacity, SafeAreaView} from 'react-native';
import axios from "axios";
import { api } from "../../../api";
import { bibleAction, feedbackAction } from "../../../store/actions";
import {ThemeContext} from '../../../context/ThemeContext';


const Book = ({ navigation: { navigate } }) => {
  const dispatch = useDispatch();
  const {books, bookId} = useSelector(({bible}) => bible);
  const [localBook, setLocalBook] = React.useState([]);
  const [search, setSearch] = React.useState("");

  React.useEffect(() => {
    handleGetBible();
  }, [])


  const handleGetBible = async () => {
    try {
      if (!bible.books) {
        dispatch(feedbackAction.launch({ loading: true }));
        const books = await axios.get(api.bibleBook);

        console.log('books', books);
        dispatch(bibleAction.updateBooks(books.data.data));
        setLocalBook(books.data.data);
        dispatch(feedbackAction.launch({loading: false}));
      }
    } catch (error) {
      console.log('error', error);
      console.log('error', error.response);
        dispatch(feedbackAction.launch({loading: false}));
    }
  }

  const handleSelect = item => () => {
    dispatch(bibleAction.setBook({id: item.bookId, name: item.name}));
    navigate('BibleChapterScreen');
  };

  const handleSearchText = search => {
    let text = search.split(' ');

    if (search !== '') {
      const data = localBook.filter(function (item) {
        return text.every(function (el) {
          return item.name.indexOf(el) > -1;
        });
      });
      dispatch(bibleAction.updateBooks(data));
    } else {
      dispatch(bibleAction.updateBooks(books));
    }

    setSearch(text);
  };

    return (
      <ThemeContext.Consumer>
        {({theme, baseColor}) => (
          <SafeAreaView
            style={[classes.root, {backgroundColor: theme.background}]}>
            <React.Fragment>
              <Searchbar
                placeholder="Search"
                onChangeText={(search) => handleSearchText(search)}
                value={search}
              />
              <FlatList
                data={books ?? []}
                extraData={bookId}
                keyExtractor={(item) => item._id}
                renderItem={({item}) => (
                  <TouchableOpacity
                    style={classes.surface}
                    onPress={handleSelect(item)}>
                    <Subheading style={classes.Subheading}>
                      {item.name}
                    </Subheading>
                    {bookId === item.bookId ? (
                      <IconButton icon="check" size={25} />
                    ) : (
                      <IconButton icon="chevron-right" size={25} />
                    )}
                  </TouchableOpacity>
                )}
              />
            </React.Fragment>
          </SafeAreaView>
        )}
      </ThemeContext.Consumer>
    );
}

const classes = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 0,
    justifyContent: 'center',
  },
  surface: {
    // flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 5,
    paddingVertical: 5,
    elevation: 4,
  },
});
export default Book;
