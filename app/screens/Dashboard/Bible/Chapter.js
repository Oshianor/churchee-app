import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, IconButton, Paragraph, Subheading, ActivityIndicator, Surface} from 'react-native-paper';
import {View, StyleSheet, ScrollView, TouchableOpacity, Dimensions, SafeAreaView} from 'react-native';
import axios from 'axios';
import { api, publicToken} from '../../../api';
import { bibleAction } from '../../../store/actions';
import {ThemeContext} from '../../../context/ThemeContext';

const { width, height } = Dimensions.get("screen");

function mapStateToProps(state) {
  return {
    bible: state.bible,
  };
}

const mapDispatchToProps = (dispatch) => ({
  setChapter: (data) => dispatch(bibleAction.setChapter(data)),
});

class BibleChapter extends Component {
  static navigationOptions = {
    title: 'Chapters',
  };

  state = {
    chapters: [],
    loading: true
  };


  async componentDidMount() {
    const { bible, setChapter } = this.props;
    try {
      this.setState({
        loading: true,
        chapters: [],
      });
      const chapter = await axios.get(
        `${api.bibleChapter}?bookId=${bible.bookId.id}`,
      );

      // chapter.data.splice(0, 1);

      console.log('chapter', chapter);
      this.setState({
        chapters: chapter.data.data,
        loading: false
      });
      // setChapter(chapter.data[1].id);
    } catch (error) {
      console.log('error', error);
      console.log('error', error.response);
    }
  }

  handleChapter = item => () => {
    const {navigation, setChapter} = this.props;
    const {chapters} = this.state;

    setChapter(item.number);
    // const chap = chapters.filter((val) => { return val.number !== item.number })
    navigation.navigate('BiblePassageScreen', { chapters });
  }

  render() {
    const {navigation, bible} = this.props;
    const {chapters, loading} = this.state;
    // const background = {
    //   backgroundColor: setting.background,
    // };
    // chapters.splice(0, 1);
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
              <Subheading>{bible.bookId.name}</Subheading>
            </View>
            {loading ? (
              <ActivityIndicator />
            ) : (
              <ScrollView contentContainerStyle={classes.container}>
                {chapters.map(data => (
                  <TouchableOpacity
                    key={data._id}
                    onPress={this.handleChapter(data)}>
                    <Surface style={classes.body}>
                      <Paragraph style={classes.title}>{data.number}</Paragraph>
                    </Surface>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}
          </SafeAreaView>
        )}
      </ThemeContext.Consumer>
    );
  }
}

const classes = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  body: {
    width: width / 6,
    height: height / 14,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  title: {
    textAlign: 'center',
  },
  heading: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(BibleChapter);
