import React, {Component} from 'react';
import {connect} from 'react-redux';
import { IconButton, Subheading, Surface } from 'react-native-paper';
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import {
  View,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { Swiper } from '../../../components/Card';
import { api } from "../../../api";
import axios from 'axios';
import moment from 'moment';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Wrapper from "../../../components/Background";
import {ThemeContext} from '../../../context/ThemeContext';
const { width, height } = Dimensions.get("screen")

const mapStateToProps = state => ({
  account: state.account,
});
class Event extends Component {
  state = {
    loading: true,
    isRefreshing: false,
    pages: 1,
    total: 0,
    pageNumber: 1,
    data: [],
    savedEvents: [],
    login: false
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
            },
          },
        );


        const savedEvents = savedItem.data.content ? savedItem.data.content : [];
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
      navigation.navigate('Onboarding', {screen: 'Login'});
    }
  };

  handleData = async () => {
    try {
      const { account } = this.props;

      this.setState({
        loading: true,
      });

      const event = await axios.get(api.getEvent, { headers: { publicToken: account.church.publicToken } });

      console.log('event', event);

      this.setState({
        loading: false,
        data: event.data.data,
        total: event.data.meta.total,
        pages: event.data.meta.pagination.pages,
      });
    } catch (error) {
      this.setState({
        loading: false,
      });
      console.log("error", error);
      console.log('error.response', error.response);
    }
  };

  handleRefreshData = async () => {
    try {
      const {account} = this.props;

      this.setState({
        isRefreshing: true,
        pageNumber: 1,
      });

      const event = await axios.get(api.getEvent, {
        headers: {publicToken: account.church.publicToken},
      });

      console.log('event', event);


      this.setState({
        isRefreshing: false,
        data: event.data.data,
        total: event.data.meta.total,
        pages: event.data.meta.pagination.pages,
      });

      console.log('handleRefreshData', this.state);
    } catch (error) {
      this.setState({
        isRefreshing: false,
      });
      console.log(error.response);
    }
  };

  handleLoadMore = async () => {
    try {
      const {pages, data, pageNumber} = this.state;
      const {account} = this.props;
      const num = Number(pageNumber) + 1;

      if (num > pages) return null;

      const event = await axios.get(api.getEvent + '?pageNumber=' + num, {
        headers: {publicToken: account.church.publicToken},
      });

      this.setState({
        loading: true,
        pageNumber: num,
      });

      console.log('handleLoadMore', event);

      const listData = data.concat(event.data.event);

      this.setState({
        loading: false,
        data: listData,
        total: event.data.total,
        pages: event.data.pages,
      });

      console.log('handleLoadMore', this.state);
    } catch (error) {
      this.setState({
        loading: false,
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
    } = this.state;

    console.log('data', data);

    return (
      <ThemeContext.Consumer>
        {({theme, baseColor}) => (
          <SafeAreaView
            style={[classes.root, {backgroundColor: theme.background}]}>
            <View style={classes.swiper}>
              <Swiper target="event" />
            </View>
            {/* <EventComponent title="Bible study" /> */}
            <Wrapper>
              <FlatList
                // contentContainerStyle={classes.container}
                data={data}
                extraData={this.state}
                keyExtractor={(item) => item._id}
                refreshing={isRefreshing}
                // ListFooterComponent={this.renderFooter.bind(this)}
                onRefresh={this.handleRefreshData}
                // onEndReached={this.handleLoadMore}
                // onEndReachedThreshold={0.4}
                renderItem={({item}) => (
                  <Surface style={classes.surface}>
                    <TouchableOpacity
                      style={classes.touch}
                      onPress={() =>
                        navigation.navigate('EventDetailScreen', {
                          // route: 'EventScreen',
                          ...item,
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
                    <TouchableOpacity onPress={this.handleSaveEvent(item._id)}>
                      <Icon
                        name={
                          savedEvents.includes(item._id)
                            ? 'heart'
                            : 'heart-outline'
                        }
                        size={25}
                        color={
                          savedEvents.includes(item._id)
                            ? baseColor
                            : theme.icon
                        }
                      />
                    </TouchableOpacity>
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
    borderRadius: 7,
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
});
export default connect(mapStateToProps)(Event);