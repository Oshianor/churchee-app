import React, {Component} from 'react';
import { Paragraph, Title, Subheading} from 'react-native-paper';
import {
  View,
  Dimensions,
  Image,
  StyleSheet,
  ScrollView,
  Share,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from "moment";
import RNCalendarEvents from 'react-native-calendar-events';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Wrapper from "../../../components/Background";
import { api, publicToken, baseUrl } from '../../../api';
import {ThemeContext} from '../../../context/ThemeContext';
// import AuthComponent from '../components/AuthModal';
import axios from 'axios';


const { width, height } = Dimensions.get('screen');


const mapStateToProps = state => ({
  account: state.account,
});

class EventDetail extends Component {
  state = {
    item: {},
    savedEvents: [],
    msg: '',
    visible: false,
    type: '',
    login: false,
  };

  async componentDidMount() {
    const { route } = this.props;

    this.setState({
      item: route.params,
      savedEvents: route.params.savedEvents,
    });
  }

  getFrequency = key => {
    switch (key) {
      case 'Sunday':
      case 'Monday':
      case 'Tuesday':
      case 'Wednesday':
      case 'Thursday':
      case 'Friday':
      case 'Saturday':
        return 'weekly';
      case '1XDM':
      case '1XDQ':
      case 'MFMONM':
      case 'MFTUESM':
      case 'MFWEDM':
      case 'MFTHURSM':
      case 'MFFRIM':
      case 'MFSATM':
      case 'MFSUNM':
        return 'monthly';
      case 'MFMONQ':
      case 'MFTUESQ':
      case 'MFWEDQ':
      case 'MFTHURSQ':
      case 'MFFRIQ':
      case 'MFSATQ':
      case 'MFSUNQ':
        return 'monthly';
      default:
        break;
    }
  };

  getIntervals = key => {
    switch (key) {
      case 'Sunday':
      case 'Monday':
      case 'Tuesday':
      case 'Wednesday':
      case 'Thursday':
      case 'Friday':
      case 'Saturday':
      case '1XDM':
      case '1XDQ':
      case 'MFMONM':
      case 'MFTUESM':
      case 'MFWEDM':
      case 'MFTHURSM':
      case 'MFFRIM':
      case 'MFSATM':
      case 'MFSUNM':
        return 1;
      case 'MFMONQ':
      case 'MFTUESQ':
      case 'MFWEDQ':
      case 'MFTHURSQ':
      case 'MFFRIQ':
      case 'MFSATQ':
      case 'MFSUNQ':
        return 3;
      default:
        break;
    }
  };

  authorization = async () => {
    const {item} = this.state;

    // get authorizationStatus
    const status = await RNCalendarEvents.authorizationStatus();

    console.log('status', status);
    console.log('item', item);

    // check if he is authorized
    if (status === 'authorized') {
      if (item.recursive) {
        // recursive event
        try {
          const event = await RNCalendarEvents.saveEvent(item.title, {
            notes: item.body,
            startDate: item.startDate,
            recurrenceRule: {
              frequency: this.getFrequency(item.recuringDate),
              interval: this.getIntervals(item.recuringDate),
              endDate: moment(item.startDate).add(2, 'years'),
            },
            endDate: moment(item.startDate).add(2, 'years'),
            location: item.location,
          });
          console.log('event', event);

          if (event) {
            this.setState({
              msg: 'Event as been successfully saved to your calendar',
              visible: true,
              type: 's',
            });

            return;
          }
        } catch (error) {
          console.log('error', error);

          this.setState({
            msg:
              'Something went wrong while trying to add event to your calendar. Please check your permissions',
            visible: true,
            type: 'w',
          });
          return;
        }
      } else {
        // ontime event
        try {
          const event = await RNCalendarEvents.saveEvent(item.title, {
            notes: item.body,
            startDate: item.startDate,
            endDate: item.endDate,
            location: item.location,
          });
          console.log('event', event);

          if (event) {
            this.setState({
              msg: 'Event as been successfully saved to your calendar',
              visible: true,
              type: 's',
            });

            return;
          }
        } catch (error) {
          console.log('error', error);

          this.setState({
            msg:
              'Something went wrong while trying to add event to your calendar. Please check your permissions',
            visible: true,
            type: 'w',
          });
          return;
        }
      }
    } else {
      RNCalendarEvents.authorizeEventStore();
    }
  };


  handleClose = () => {
    this.setState({
      login: false,
      visible: false,
      msg: '',
      type: '',
    });
  };

  onShare = async () => {
    const {item} = this.state;
    try {
      const result = await Share.share({
        title: item.title,
        // message: `${item.body}/n/n ${moment(item.startDate).format("DDD MM, YY")} /n/n ${baseUrl}/event/${item._id}/${item.title}`,
        message: `${baseUrl}/event/${item._id}/${item.title.replace(/\s/g, "-")}`,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('result.activityType', result.activityType);

          // shared with activity type of result.activityType
        } else {
          // shared
          console.log('result-type.activityType', result.action);
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
        console.log('result-type.activityType', result.action);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  handleSaveEvent = async () => {
    const {account, navigation} = this.props;
    const { item } = this.state;


    if (account.token) {
      try {
        const savedItem = await axios.put(
          api.savedItem,
          {
            type: 'event',
            value: item._id,
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
      navigation.navigate('Onboarding');

    }
  };

  render() {
    const {navigation} = this.props;
    const {savedEvents, item, visible, msg, type, login} = this.state;
    const {fontSize} = this.context;


    const fslg = {
      fontSize: fontSize + 5,
      paddingVertical: 5,
    };

    const fssm = {
      fontSize: fontSize,
      paddingVertical: 5,
    };

    return (
      <ThemeContext.Consumer>
        {({theme, baseColor}) => (
          <View style={[classes.root, {backgroundColor: theme.background}]}>
            <ScrollView contentContainerStyle={classes.container}>
              <Wrapper>
                <Title style={[classes.titleScreen, fslg]}>{item.title}</Title>
                <Image source={{uri: api.img + item.img}} style={classes.img} />
                <View style={classes.rootDetail}>
                  <View style={classes.sideleft}>
                    <Icon name="calendar" size={25} />
                    <Paragraph>
                      {moment(item.startDate).format('MMMM DD, YYYY')}
                    </Paragraph>
                  </View>
                  <View style={classes.sideright}>
                    <Icon name="timer-outline" size={25} />
                    <Paragraph>
                      {item.recuringDate
                        ? item.time
                        : moment(item.startDate).format('HH:MM a')}
                    </Paragraph>
                  </View>
                </View>
                <Paragraph style={[classes.para, fssm]}>{item.body}</Paragraph>
                <View style={classes.bottom}>
                  <TouchableOpacity onPress={this.onShare}>
                    <View style={classes.sideleft}>
                      <Icon
                        name="share-variant"
                        size={30}
                        color={theme.icon}
                        style={classes.icons}
                      />
                      <Paragraph style={fssm}>
                        Share this event with friends and loved ones.
                      </Paragraph>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={this.handleSaveEvent}>
                    <View style={classes.sideleft}>
                      <Icon
                        name={
                          savedEvents.includes(item._id)
                            ? 'heart'
                            : 'heart-outline'
                        }
                        size={30}
                        color={
                          savedEvents.includes(item._id)
                            ? baseColor
                            : theme.icon
                        }
                        style={classes.icons}
                      />
                      <Paragraph style={fssm}>
                        Add event to saved event list.
                      </Paragraph>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={this.authorization}>
                    <View style={classes.sideleft}>
                      <Icon
                        name="calendar-plus"
                        size={30}
                        color={theme.icon}
                        style={classes.icons}
                      />
                      <Paragraph style={fssm}>
                        Add event to your phone calendar.
                      </Paragraph>
                    </View>
                  </TouchableOpacity>
                </View>
              </Wrapper>
            </ScrollView>
          </View>
        )}
      </ThemeContext.Consumer>
    );
  }
}

EventDetail.contextType = ThemeContext;

export default connect(mapStateToProps)(EventDetail);

const classes = StyleSheet.create({
  root: {
    flex: 1,
  },
  rootDetail: {
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  sideleft: {
    justifyContent: 'flex-start',
    marginVertical: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
  sideright: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerRight: {
    flex: 1,
    justifyContent: 'flex-end',
    marginHorizontal: 15,
    alignItems: 'center',
    flexDirection: 'row',
  },
  bottom: {
    flex: 1,
    marginVertical: 30,
    paddingHorizontal: 10,
    justifyContent: 'flex-start',
  },
  icons: {
    marginRight: 5,
    padding: 0,
    marginLeft: -5
  },
  img: {
    width: width,
    height: height / 3.5,
    // padding: 2,
  },
  title: { flex: 1, justifyContent: 'flex-start', textTransform: 'capitalize' },
  titleScreen: {
    paddingHorizontal: 10,
    textTransform: 'capitalize',
  },
  para: {
    paddingHorizontal: 10,
  },
});

