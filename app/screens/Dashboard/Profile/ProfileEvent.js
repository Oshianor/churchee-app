import React, {Component} from 'react';
import {
  IconButton,
  Paragraph,
	Title,
} from 'react-native-paper';
import {
  View,
  Dimensions,
  StyleSheet,
  ScrollView,
  Share,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux';
import moment from "moment";
import RNCalendarEvents from 'react-native-calendar-events';
import SnackBarComponent from "../components/Snackbar";
import AsyncStorage from '@react-native-community/async-storage';
import {ThemeContext} from '../components/ThemeContext';




class ProfileEventDetail extends Component {
  static navigationOptions = ({navigation}) => {
    const item = navigation.getParam('item', 'Events');
    return {
      headerTitle: (
        <Paragraph style={classes.title}>
          {item.title.length > 30
            ? item.title.substring(0, 30) + '...'
            : item.title}
        </Paragraph>
      ),
    };
  };

  state = {
    item: {},
    savedEvents: [],
    msg: '',
    visible: false,
    type: '',
  };

  async componentDidMount() {
    const {navigation} = this.props;

    // set the params passed to the state
    const item = navigation.getParam('item', 'Events');
    const savedEvents = navigation.getParam('savedEvents', []);

    this.setState({
      item,
      savedEvents,
    });
  }

  authorization = async () => {
    const {item} = this.state;

    // get authorizationStatus
    const status = await RNCalendarEvents.authorizationStatus();

    console.log('status', status);
    console.log('item', item);

    // check if he is authorized
    if (status === 'authorized') {
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

      this.setState({
        msg:
          'Something went wrong while trying to add event to your calendar. Please check your permissions',
        visible: true,
        type: 'w',
      });
      return;
    } else {
      RNCalendarEvents.authorizeEventStore();
    }
  };

  handleSaveEvent = eventId => async () => {
    const {savedEvents} = this.state;

    // /check if the event has been added before
    if (!savedEvents.includes(eventId)) {
      savedEvents.push(eventId);
      console.log('savedEvents-add', savedEvents);

      await AsyncStorage.setItem('savedEvents', JSON.stringify(savedEvents));
      this.setState({
        savedEvents,
      });
    } else {
      // find the index of the id
      const eventIndex = savedEvents.indexOf(eventId);

      savedEvents.splice(eventIndex, 1);

      await AsyncStorage.setItem('savedEvents', JSON.stringify(savedEvents));

      this.setState({
        savedEvents,
      });
    }
  };

  handleClose = () => {
    this.setState({
      visible: false,
      msg: '',
      type: '',
    });
  };

  onShare = async () => {
    const { item } = this.state;
    try {
      const result = await Share.share({
        title: item.title,
        message: item.body + " " + item.startDate.toString(),
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

  render() {
    const { navigation} = this.props;
    const {savedEvents, item, visible, msg, type} = this.state;

    

    return (
      <ThemeContext.Consumer>
        {({theme, baseColor}) => (
      <ScrollView
        contentContainerStyle={[
          classes.root,
          {backgroundColor: theme.background},
        ]}>
        <Title style={classes.titleScreen}>{item.title}</Title>
        <Paragraph>{item.body}</Paragraph>
        <View style={classes.rootDetail}>
          <View style={classes.sideleft}>
            <IconButton icon="date-range" size={25} />
            <Paragraph>{moment(item.date).format('MMMM DD, YYYY')}</Paragraph>
          </View>
          <View style={classes.sideright}>
            <IconButton icon="alarm-on" size={25} />
            <Paragraph>{moment(item.date).format('hh:mmA')}</Paragraph>
          </View>
        </View>
        <View style={classes.bottom}>
          <TouchableOpacity onPress={this.onShare}>
            <View style={classes.sideleft}>
              <Icon
                name="share-variant"
                size={30}
                color={theme.icon}
                style={classes.icons}
              />
              <Paragraph>
                Share this event with friends and loved ones.
              </Paragraph>
            </View>
          </TouchableOpacity>
          <View style={classes.sideleft}>
            <Icon
              name="bookmark-plus"
              size={30}
              // color={setting.icon}
              color={
                savedEvents.includes(item._id) ? baseColor : 'black'
              }
              style={classes.icons}
            />
            <Paragraph>Add event to saved event list.</Paragraph>
          </View>
          <TouchableOpacity onPress={this.authorization}>
            <View style={classes.sideleft}>
              <Icon
                name="calendar-plus"
                size={30}
                color={theme.icon}
                style={classes.icons}
              />
              <Paragraph>Add event to your phone calendar.</Paragraph>
            </View>
          </TouchableOpacity>
        </View>
        <SnackBarComponent
          visible={visible}
          type={type}
          msg={msg}
          handleClose={this.handleClose}
        />
      </ScrollView>
      )}
      </ThemeContext.Consumer>
    );
  }
}

export default ProfileEventDetail;

const classes = StyleSheet.create({
  root: {
    flex: 1,
    // marginVertical: 30,
    padding: 15,
  },
  rootDetail: {
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
    justifyContent: 'flex-start',
  },
  icons: {
    marginRight: 5,
  },
  title: {flex: 1, justifyContent: 'flex-start', textTransform: 'capitalize'},
  titleScreen: {
    textTransform: 'capitalize',
  },
});