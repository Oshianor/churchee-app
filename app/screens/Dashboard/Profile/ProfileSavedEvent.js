import React, {Component} from 'react';
import {connect} from 'react-redux';
import {IconButton, Subheading, Surface, Paragraph} from 'react-native-paper';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { api, publicToken} from '../../../api';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Wrapper from '../../../components/Background';
import {ThemeContext} from '../../../context/ThemeContext';

const {width, height} = Dimensions.get('screen');

const mapStateToProps = state => ({
  // setting: state.setting,
  account: state.account,
});

class Event extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerTitle: <Paragraph style={classes.title}>Saved Events</Paragraph>,
    };
  };

  state = {
    loading: true,
    isRefreshing: false,
    pages: 1,
    total: 0,
    pageNumber: 1,
    data: [],
    savedEvents: [],
    login: false,
    visible: false,
    msg: '',
    type: '',
  };

  async componentDidMount() {
    try {
      const savedEvent = await AsyncStorage.getItem('savedEvents');

      const savedEvents = JSON.parse(savedEvent);

      console.log('savedEvents-cdm', savedEvents);

      this.setState({
        savedEvents: savedEvents ? savedEvents : [],
      });
    } catch (error) {
      console.log('savedEvent', error);
    }
    this.handleData();
  }

  handleAuthClose = (visible, msg, type) => {
    this.setState({
      login: false,
      visible,
      msg,
      type,
    });
  };

  handleClose = () => {
    this.setState({
      visible: false,
      msg: '',
      type: '',
    });
  };

  handleSaveEvent = eventId => async () => {
    const {account, navigation} = this.props;

    if (account.token) {
      try {
        const savedItem = await axios.put(
          api.savedItem,
          {
            type: 'event',
            value: eventId,
          },
          {
            headers: {
              'x-auth-token': account.token,
              publicToken
            },
          },
        );

        const savedEvents = savedItem.data.content
          ? savedItem.data.content
          : [];
        await AsyncStorage.setItem('savedEvents', JSON.stringify(savedEvents));
        console.log('savedItem.data.content', savedEvents);

        this.setState({
          savedEvents,
          visible: true,
          msg: savedItem.data.msg,
          type: 's',
        });
      } catch (error) {
        console.log('error', error);
        console.log('error.response', error.response);

        this.setState({
          visible: true,
          msg: error.response.data,
          type: 'w',
        });
      }
    } else {
      this.setState({
        login: true,
      });
      navigation.navigate('Login');

    }
  };

  handleData = async () => {
    const {account} = this.props;

    try {
      this.setState({
        loading: true,
      });

      const event = await axios.get(api.savedEvents, {
        headers: { 'x-auth-token': account.token, publicToken},
      });

      console.log('event', event);

      this.setState({
        loading: false,
        data: event.data,
      });

      console.log('handleData', this.state);
    } catch (error) {
      this.setState({
        loading: false,
      });
      console.log(error.response);
    }
  };

  handleRefreshData = async () => {
    try {
      this.setState({
        isRefreshing: true,
        pageNumber: 1,
      });

      const event = await axios.get(api.savedEvents, {
        headers: { 'x-auth-token': account.token, publicToken},
      });

      this.setState({
        isRefreshing: false,
        data: event.data,
      });

      console.log('handleRefreshData', this.state);
    } catch (error) {
      this.setState({
        isRefreshing: false,
      });
      console.log(error.response);
    }
  };

  renderFooter = () => {
    const {loading} = this.state;
    //it will show indicator at the bottom of the list when data is loading otherwise it returns null
    if (!loading) return null;
    return <ActivityIndicator style={{color: '#000'}} />;
  };

  render() {
    const {navigation} = this.props;
    const {
      isRefreshing,
      savedEvents,
      data,
      login,
      visible,
      type,
      msg,
    } = this.state;

    return (
      <ThemeContext.Consumer>
        {({theme, baseColor}) => (
          <SafeAreaView
            style={[classes.root, {backgroundColor: theme.background}]}>
            <Wrapper>
              <FlatList
                // contentContainerStyle={classes.container}
                data={data}
                extraData={this.state}
                keyExtractor={item => item._id}
                refreshing={isRefreshing}
                onRefresh={this.handleRefreshData}
                renderItem={({item}) => (
                  <Surface style={classes.surface}>
                    <TouchableOpacity
                      style={classes.touch}
                      onPress={() =>
                        navigation.navigate('EventDetailScreen', {
                          route: 'ProfileSavedEventScreen',
                          item,
                          savedEvents,
                        })
                      }>
                      <View style={classes.leftSide}>
                        <View style={classes.topRoot}>
                          <Subheading
                            style={[
                              classes.bibleTypeFontSize,
                              {color: baseColor},
                            ]}>
                            {moment(item.startDate).format('MMM')}
                          </Subheading>
                          <Subheading
                            style={[
                              classes.bibleTypeFontSize,
                              {color: baseColor},
                            ]}>
                            {/* {item.recursive
                              ? moment(item.time).format('DD')
                              : moment(item.startDate).format('DD')} */}
                            {moment(item.startDate).format('DD')}
                          </Subheading>
                        </View>
                        <Subheading style={classes.para}>
                          {item.title.length > 30
                            ? item.title.substring(0, 30) + '...'
                            : item.title}
                        </Subheading>
                      </View>
                    </TouchableOpacity>
                    <IconButton
                      icon={
                        savedEvents.includes(item._id)
                          ? 'favorite'
                          : 'favorite-border'
                      }
                      size={25}
                      color={
                        savedEvents.includes(item._id) ? baseColor : theme.icon
                      }
                      onPress={this.handleSaveEvent(item._id)}
                    />
                  </Surface>
                )}
              />
            </Wrapper>
          </SafeAreaView>
        )}
      </ThemeContext.Consumer>
    );
  }
}

const classes = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
  },
  swiper: {
    marginBottom: 15,
    height: height / 3.5,
  },
  body: {
    marginHorizontal: 5,
  },
  touch: {
    // margin: 15,
  },
  surface: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 5,
    borderRadius: 5,
    margin: 10,
    elevation: 4,
  },
  leftSide: {
    flexDirection: 'row',
    flex: 0.5,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topRoot: {
    // flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
    paddingHorizontal: 10,
  },
  bottomRoot: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
  },
  bibleTypeFontSize: {
    fontSize: 15,
  },
  icon: {
    paddingHorizontal: 10,
  },
  para: {
    paddingHorizontal: 10,
    textTransform: 'capitalize',
  },
  title: {flex: 1, justifyContent: 'flex-start'},
});
export default connect(mapStateToProps)(Event);