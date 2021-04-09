import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Subheading, Surface} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {Swiper} from '../../../components/Card';
import {api} from '../../../api';
import axios from 'axios';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Wrapper from '../../../components/Background';
import {ThemeContext} from '../../../context/ThemeContext';
import {accountAction, eventAction, feedbackAction} from '../../../store/actions';
const {width, height} = Dimensions.get('screen');

const Event = ({navigation: {navigate}}) => {
  const dispatch = useDispatch();
  const event = useSelector(({event}) => event);
  const {
    church: {publicToken},
  } = useSelector(({church}) => church);
  const {token, user} = useSelector(({account}) => account);
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [savedEvents, setSavedEvents] = React.useState([]);

  React.useEffect(() => {
    getSaved();
    handleData();
  }, []);

  const getSaved = async () => {
    try {
      let savedEvents = await AsyncStorage.getItem('savedEvents');

      savedEvents = JSON.parse(savedEvents);

      console.log('savedEvents-cdm', savedEvents);

      setSavedEvents(savedEvents ?? []);
    } catch (error) {
      console.log('savedEvent', error);
    }
  };

  const handleSaveEvent = async (eventId) => {
    try {
      const savedItem = await axios.patch(
        api.savedItem,
        {
          type: 'event',
          value: eventId,
        },
        {
          headers: {
            'x-auth-token': token,
          },
        },
      );

      console.log('savedItem', savedItem);

      const userData = await axios.get(api.getMe, {
        headers: {
          'x-auth-token': token,
        },
      });

      console.log('userData', userData);

      dispatch(accountAction.setUserData(userData.data.data));
      setSavedEvents(userData?.data?.data?.event);

      // const savedEvents = savedItem.data.content
      //   ? savedItem.data.content
      //   : [];
      // await AsyncStorage.setItem('savedEvents', JSON.stringify(savedEvents));
      // console.log('savedItem.data.content', savedEvents);
    } catch (error) {
      console.log('error', error);
      console.log('error.response', error.response);
    }
  };

  const handleData = async () => {
    try {
      dispatch(feedbackAction.launch({loading: true}));

      const event = await axios.get(api.getEvent, {
        headers: {publicToken},
      });

      console.log('event', event);

      dispatch(
        eventAction.setEvent({
          data: event?.data?.data,
          total: event?.data?.meta?.total,
          pages: event?.data?.meta?.page,
        }),
      );

      dispatch(feedbackAction.launch({loading: false}));
    } catch (error) {
      dispatch(feedbackAction.launch({loading: false}));

      console.log('error', error);
      console.log('error.response', error.response);
    }
  };

  const handleRefreshData = async () => {
    try {
      setIsRefreshing(true);

      const event = await axios.get(api.getEvent, {
        headers: {publicToken},
      });

      console.log('event', event);

      setIsRefreshing(false);

      dispatch(
        eventAction.setEvent({
          data: event.data.data,
          total: event.data.meta.total,
          pages: event.data.meta.pages,
        }),
      );
    } catch (error) {
      setIsRefreshing(false);
      console.log(error.response);
    }
  };

  const handleLoadMore = async () => {
    try {
      const {pages, data, pageNumber} = this.state;
      const num = Number(pageNumber) + 1;

      if (num > pages) return null;

      const event = await axios.get(api.getEvent + '?pageNumber=' + num, {
        headers: {publicToken},
      });

      // this.setState({
      //   loading: true,
      //   pageNumber: num,
      // });

      console.log('handleLoadMore', event);

      const listData = data.concat(event.data.event);

      // this.setState({
      //   loading: false,
      //   data: listData,
      //   total: event.data.total,
      //   pages: event.data.pages,
      // });

      console.log('handleLoadMore', this.state);
    } catch (error) {
      // this.setState({
      //   loading: false,
      // });
      console.log(error.response);
    }
  };

  const renderFooter = () => {
    //it will show indicator at the bottom of the list when data is loading otherwise it returns null
    if (!loading) return null;
    return <ActivityIndicator style={{color: '#000'}} />;
  };

  return (
    <ThemeContext.Consumer>
      {({theme, baseColor}) => (
        <SafeAreaView
          style={[classes.root, {backgroundColor: theme.background}]}>
          <Wrapper>
            <FlatList
              // contentContainerStyle={classes.container}
              data={event.data}
              extraData={event.data}
              keyExtractor={(item) => item._id}
              refreshing={isRefreshing}
              ListFooterComponent={renderFooter}
              onRefresh={handleRefreshData}
              onEndReached={handleLoadMore}
              onEndReachedThreshold={0.4}
              renderItem={({item}) => (
                <Surface style={classes.surface}>
                  <TouchableOpacity
                    style={classes.touch}
                    onPress={() =>
                      navigate('EventDetailScreen', {
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
                  <TouchableOpacity onPress={() => handleSaveEvent(item._id)}>
                    <Icon
                      name={
                        savedEvents.includes(item._id)
                          ? 'heart'
                          : 'heart-outline'
                      }
                      size={25}
                      color={
                        savedEvents.includes(item._id) ? baseColor : theme.icon
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
};

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
export default Event;

{
  /* <View style={classes.swiper}>
              <Swiper target="event" />
            </View> */
}
{
  /* <EventComponent title="Bible study" /> */
}
