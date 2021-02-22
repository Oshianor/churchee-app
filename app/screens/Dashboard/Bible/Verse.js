import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  Button,
  Title,
  Paragraph,
  Subheading,
  ActivityIndicator,
} from 'react-native-paper';
import {View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import axios from 'axios';
import {api, publicToken} from '../../../api';
import {bibleAction} from '../../../store/actions';
import {ThemeContext} from '../../../context/ThemeContext';


function mapStateToProps(state) {
  return {
    // setting: state.setting,
    bible: state.bible,
  };
}

const mapDispatchToProps = (dispatch) => ({
  setVerse: (data) => dispatch(bibleAction.setVerse(data)),
});

class BibleVerse extends Component {
  state = {
    verses: [],
    loading: true,
  };

  async componentDidUpdate(prevProps, prevState) {
    console.log('update');

    try {
      const {bible, setVerse} = this.props;

      if (prevProps.bible.chapterId !== bible.chapterId) {
        this.setState({
          loading: true,
          verses: [],
        });
        const verse = await axios.get(
          api.bibleVerse + '/' + bible.chapterId,
          { headers: { publicToken } }
        );

        // verse.data.splice(0, 1);

        console.log('verse', verse);
        this.setState({
          verses: verse.data,
          loading: false,
        });
        setVerse(verse.data[1].id);
      }
    } catch (error) {
      console.log('error', error);
      console.log('error', error.response);
    }
  }

  handleVerse = item => () => {
    const {navigation, setVerse} = this.props;

    setVerse(item.id);
    navigation.navigate('BiblePassageScreen');
  };

  render() {
    const {navigation, setting} = this.props;
    const {verses, loading} = this.state;
    // const background = {
    //   backgroundColor: setting.background,
    // };
    // verses.splice(0, 1)
    return (
      <ThemeContext.Consumer>
        {({theme, baseColor}) => (
          <View style={[classes.root, {backgroundColor: theme.background}]}>
            {loading ? (
              <ActivityIndicator />
            ) : (
              <ScrollView contentContainerStyle={classes.container}>
                {verses.map(data => (
                  <TouchableOpacity
                    key={data.id}
                    onPress={this.handleVerse(data)}
                    style={classes.body}>
                    <Paragraph style={classes.title}>{data.id}</Paragraph>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}
          </View>
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  body: {
    width: 90,
    // width: 40,
    padding: 5,
    margin: 10,
  },
  title: {
    textAlign: 'center',
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BibleVerse);
