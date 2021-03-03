import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Paragraph, IconButton, Caption} from 'react-native-paper';
import {
  View,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  Platform
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import { api, publicToken} from '../../../api';
import {bibleAction} from '../../../store/actions';
import {ThemeContext} from '../../../context/ThemeContext';


function mapStateToProps(state) {
  return {
    // setting: state.setting,
    bible: state.bible,
  };
}


class BiblePassage extends Component {
  state = {
    chapter: 1,
    // chapter: 'Genesis 1',
    chapters: [],
    lastChapter: 0,
    type: 'NKJ',
    types: [],
    passage: [],
    loading: true,
  };

  async componentDidMount() {
    try {
      const { bible, navigation, route: { params } } = this.props;
      
      // const chap = navigation.getParam('chapters', []);
      this.setState({
        loading: true,
      });
      const passage = await axios.get(
        `${api.bibleChapter}?bookId=${bible.bookId.id}&chapter=${bible.chapterId}`,
      );
      const bibleData = await axios.get(api.bible);

      const types = [];
      bibleData.data.data.forEach(element => {
        types.push({ label: element.key, value: element.key });
      });

      const chapters = [];
      params.chapters.forEach(element => {
        chapters.push({
          label: bible.bookId.name + ' ' + element.number,
          value: element.number,
        });
      });

      console.log('passage', passage);
      this.setState({
        passage: passage.data.data.verse,
        types,
        chapters,
        chapter: bible.chapterId,
        lastChapter: params.chapters[params.chapters.length - 1].number,
        loading: false,
      });
    } catch (error) {
      console.log('error', error);
      console.log('error', error.response);
    }
  }

  handleNext = async () => {
    try {
      const { bible, navigation } = this.props;
      const { chapter } = this.state;

      this.setState({
        loading: true,
      });

      const passage = await axios.get(
        `${api.bibleChapter}?bookId=${bible.bookId.id}&chapter=${Number(
          chapter + 1,
        )}`
      );

      console.log('passage', passage);
      this.setState({
        passage: passage.data.data.verse,
        chapter: Number(chapter + 1),
        loading: false,
      });
    } catch (error) {
      console.log('error', error);
      console.log('error', error.response);
    }
  };

  handlePrevious = async () => {
    try {
      const { bible, navigation } = this.props;
      const { chapter } = this.state;

      this.setState({
        loading: true,
      });

      const passage = await axios.get(
        `${api.bibleChapter}?bookId=${bible.bookId.id}&chapter=${Number(
          chapter - 1,
        )}`
      );

      console.log('passage', passage);
      this.setState({
        passage: passage.data.data.verse,
        chapter: Number(chapter - 1),
        loading: false,
      });
    } catch (error) {
      console.log('error', error);
      console.log('error', error.response);
    }
  };

  handleChapterChangeIOS = async () => {
    try {
      const { bible, navigation } = this.props;
      const { chapter } = this.state;

      this.setState({
        loading: true,
      });

      const passage = await axios.get(
        `${api.bibleChapter}?bookId=${bible.bookId.id}&chapter=${Number(
          chapter,
        )}`
      );

      console.log('passage', passage);
      this.setState({
        passage: passage.data.data.verse,
        chapter: Number(chapter),
        loading: false,
      });
    } catch (error) {
      console.log('error', error);
      console.log('error', error.response);
    }
  };

  handleChapterChange = async chapter => {
    try {
      const { bible, navigation } = this.props;

      this.setState({
        loading: true,
      });

      const passage = await axios.get(
        `${api.bibleChapter}?bookId=${bible.bookId.id}&chapter=${Number(
          chapter,
        )}`
      );

      console.log('passage', passage);
      this.setState({
        passage: passage.data.data.verse,
        chapter: Number(chapter),
        loading: false,
      });
    } catch (error) {
      console.log('error', error);
      console.log('error', error.response);
    }
  };

  handleBibleChangeIOS = async () => {
    const { bible } = this.props;
    const { type } = this.state;
    try {
      if (type !== '') {
        this.setState({
          loading: true,
        });
        const passage = await axios.get(
          `${api.bibleChapter}?bibleId=${type}&bookId=${bible.bookId.id}&chapter=${bible.chapterId}`
        );
        console.log('passage--loading', passage);
        this.setState({
          type: type,
          passage: passage.data.data.verse,
          loading: false,
        });
        return;
      }
    } catch (error) {
      console.log('error', error);
      console.log('error', error.response);
    }
  };

  handleBibleChange = async type => {
    const { bible } = this.props;
    try {
      if (type !== '') {
        this.setState({
          loading: true,
        });
        const passage = await axios.get(
          `${api.bibleChapter}?bibleId=${type}&bookId=${bible.bookId.id}&chapter=${bible.chapterId}`,
        );
        console.log('passage--loading', passage);
        this.setState({
          type: type,
          passage: passage.data.data.verse,
          loading: false,
        });
        return;
      }
    } catch (error) {
      console.log('error', error);
      console.log('error', error.response);
    }
  };

  handleValueChange = type => {
    this.setState({
      type,
    });
  };

  handleChapterValueChange = chapter => {
    this.setState({
      chapter,
    });
  };

  render() {
    const { navigation } = this.props;
    const {
      type,
      chapter,
      passage,
      types,
      loading,
      chapters,
      lastChapter,
    } = this.state;
    const { theme, fontSize } = this.context;

    // const background = {
    //   backgroundColor: setting.background,
    // };

    const fssm = {
      fontSize: fontSize,
      paddingVertical: 7,
    };
    const fsxs = {
      fontSize: fontSize - 5,
      paddingVertical: 5,
    };

    return (
      <ThemeContext.Consumer>
        {({theme}) => (
          <SafeAreaView
            style={[classes.root, {backgroundColor: theme.background}]}>
            <View style={classes.heading}>
              <IconButton
                icon="chevron-left"
                onPress={() => navigation.goBack()}
                size={25}
              />
              <View style={classes.dropDwon}>
                <RNPickerSelect
                  Icon={() => {
                    return (
                      <Icon
                        name="arrow-drop-down"
                        size={25}
                        color={theme.icon}
                      />
                    );
                  }}
                  onDonePress={this.handleChapterChangeIOS}
                  onValueChange={
                    Platform.OS === 'android'
                      ? this.handleChapterChange
                      : this.handleChapterValueChange
                  }
                  style={{
                    inputIOS: {
                      ...pickerSelectStyles.inputIOS,
                      color: theme.text,
                    },
                    inputAndroid: {
                      ...pickerSelectStyles.inputAndroid,
                      color: theme.text,
                      width: 150
                    },
                    iconContainer: {
                      top: Platform.OS === "android" ? 10 : 2,
                      left: Platform.OS === "android" ? 100 : 0,
                      right: 10,
                    },
                  }}
                  items={chapters}
                  value={chapter}
                />
                <RNPickerSelect
                  Icon={() => {
                    return (
                      <Icon
                        name="arrow-drop-down"
                        size={25}
                        color={theme.icon}
                      />
                    );
                  }}
                  onDonePress={this.handleBibleChangeIOS}
                  onValueChange={
                    Platform.OS === 'android'
                      ? this.handleBibleChange
                      : this.handleValueChange
                  }
                  style={{
                    inputIOS: {
                      ...pickerSelectStyles.inputIOS,
                      color: theme.text,
                    },
                    inputAndroid: {
                      ...pickerSelectStyles.inputAndroid,
                      color: theme.text,
                      width: 100
                    },
                    iconContainer: {
                      top: Platform.OS === "android" ? 10 : 2,
                      left: Platform.OS === "android" ? 40 : 0,
                      right: 10,
                    },
                  }}
                  items={types}
                  value={type}
                />
              </View>
            </View>

            <View style={classes.body}>
              {loading ? (
                <ActivityIndicator />
              ) : (
                <ScrollView>
                  {passage.map(content => (
                    <Paragraph style={fssm} key={content.number}>
                      <Caption style={fsxs}>{content.number + '  '}</Caption>
                      {content.body + '\n'}
                    </Paragraph>
                  ))}
                </ScrollView>
              )}
            </View>
            <View style={classes.bottom}>
              <IconButton
                icon="chevron-left"
                disabled={chapter == 1}
                onPress={this.handlePrevious}
                size={25}
              />
              <IconButton
                icon="chevron-right"
                disabled={chapter >= lastChapter}
                onPress={this.handleNext}
                size={25}
              />
            </View>
          </SafeAreaView>
        )}
      </ThemeContext.Consumer>
    );
  }
}

BiblePassage.contextType = ThemeContext;

const classes = StyleSheet.create({
  root: {
    flex: 1,
  },
  heading: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropDwon: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  bibleTypeFontSize: {
    fontSize: 13,
  },
  title: {
    textAlign: 'center',
  },
  topRoot: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
  bottom: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
});


const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 15,
    marginLeft: 15,
    paddingVertical: 7,
    paddingHorizontal: 10,
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 8,
    // justifyContent: "center",
    // alignItems: "center",
    // marginRight: 0
    // marginLeft: 15,
    // paddingHorizontal: 10,
    // width: 150,
    // paddingVertical: 7,
    // paddingRight: 0, // to ensure the text is never behind the icon
  },
});

export default connect(
  mapStateToProps,
)(BiblePassage);

