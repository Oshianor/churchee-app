import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  Subheading,
  Searchbar,
  IconButton,
  ActivityIndicator,
} from 'react-native-paper';
import {View, StyleSheet, FlatList, TouchableOpacity, SafeAreaView} from 'react-native';
import axios from "axios";
import { api, publicToken } from "../../../api";
import { bibleAction } from "../../../store/actions";
// import WrapperComponent from '../components/Wrapper';
import {ThemeContext} from '../../../context/ThemeContext';


function mapStateToProps(state) {
  return {
    bible: state.bible,
  };
}

const mapDispatchToProps = (dispatch) => ({
  updateBooks: (data) => dispatch(bibleAction.updateBooks(data)),
  setBook: (data) => dispatch(bibleAction.setBook(data)),
});

class Book extends Component {
  state = {
    search: '',
    loading: false,
  };

  async componentDidMount() {
    try {
      const { updateBooks, bible, setBook } = this.props;

      if (!bible.books) {
        this.setState({
          loading: true,
        });
        const books = await axios.get(api.bibleBook);

        console.log('books', books);
        updateBooks(books.data.data);
        // setBook(books.data[0].id);
        this.setState({
          loading: false,
          books: books.data.data,
        });
      }
    } catch (error) {
      console.log('error', error);
      console.log('error', error.response);
    }
  }

  handleSelect = item => () => {
    const { navigation, setBook } = this.props;

    setBook({id: item.bookId, name: item.name });
    navigation.navigate('BibleChapterScreen');
  };

  handleSearchText = search => {
    const { books } = this.state;
    const { updateBooks, bible } = this.props;
    text = search.split(' ');
    console.log('eeeee');

    if (search !== '') {
      const data = bible.books.filter(function(item) {
        return text.every(function(el) {
          return item.name.indexOf(el) > -1;
        });
      });
      updateBooks(data);
    } else {
      updateBooks(books);
    }

    this.setState({
      search: text,
    });
  };

  render() {
    const { navigation, bible } = this.props;
    const { search, loading } = this.state;
    // const background = {
    //   backgroundColor: setting.background,
    // };
    return (
      <ThemeContext.Consumer>
        {({theme, baseColor}) => (
          <SafeAreaView
            style={[classes.root, {backgroundColor: theme.background}]}>
            {/* <WrapperComponent> */}
              {loading ? (
                <ActivityIndicator />
              ) : (
                <React.Fragment>
                  <Searchbar
                    placeholder="Search"
                    onChangeText={search => this.handleSearchText(search)}
                    value={search}
                  />
                  <FlatList
                    data={bible.books ? bible.books : []}
                    extraData={bible}
                    keyExtractor={item => item._id}
                    renderItem={({item}) => (
                      <TouchableOpacity
                        style={classes.surface}
                        onPress={this.handleSelect(item)}>
                        <Subheading style={classes.Subheading}>
                          {item.name}
                        </Subheading>
                        {bible.bookId === item.bookId ? (
                          <IconButton icon="check" size={25} />
                        ) : (
                          <IconButton icon="chevron-right" size={25} />
                        )}
                      </TouchableOpacity>
                    )}
                  />
                </React.Fragment>
              )}
            {/* </WrapperComponent> */}
          </SafeAreaView>
        )}
      </ThemeContext.Consumer>
    );
  }
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
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Book);
