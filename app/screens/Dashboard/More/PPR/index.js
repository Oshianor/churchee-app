import React, {Component} from 'react';
import {
  Surface,
  Caption,
  IconButton,
  Subheading,
  FAB,
  Paragraph,
  Avatar,
  TextInput,
  Button,
} from 'react-native-paper';
import {
  View,
  Dimensions,
  StyleSheet,
  KeyboardAvoidingView,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import {connect} from 'react-redux';
import {config, publicToken} from '../config';
import axios from 'axios';
import moment from 'moment';
// import {StackActions, NavigationActions} from 'react-navigation';
import Wrapper from '../components/Wrapper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SnackbarComponent from '../components/Snackbar';
import {getDeviceId} from 'react-native-device-info';
import {ThemeContext} from '../components/ThemeContext';
// import AuthComponent from '../components/AuthModal';


function mapStateToProps(state) {
  return {
    account: state.account,
  };
}

const {width} = Dimensions.get('screen');

class PersonalPrayRequest extends Component {
  static navigationOptions = ({navigation}) => {
    const item = navigation.getParam('back', 'ProfileHomeScreen');
    return {
      headerLeft: (
        <IconButton
          icon="arrow-back"
          onPress={() => navigation.navigate(item)}
          size={30}
        />
      ),
      headerTitle: (
        <Paragraph style={classes.title}>Personal Prayer Request</Paragraph>
      ),
    };
  };

  state = {
    loading: false,
    login: false,
    pageNumber: 1,
    phoneNumber: '',
    subject: '',
    email: '',
    body: '\n\n\n',
    visible: false,
    msg: '',
    type: '',
  };

  handleAuthClose = (visible, msg, type) => {
    this.setState({
      login: false,
      visible,
      msg,
      type,
    });
  };



  handlePrayrequest = async () => {
    try {
      const {subject, phoneNumber, email, Name, body} = this.state;
      const {navigation, account} = this.props;

      if (!account.token) {
        this.setState({
          login: true,
        });
        navigation.navigate('Login');

        return;
      }

      this.setState({
        visible: false,
        loading: true,
        msg: '',
      });

      const prayer = await axios({
        method: 'post',
        data: {
          subject,
          phoneNumber,
          email,
          body,
        },
        url: config.personalPrayer,
        headers: { 'x-auth-token': account.token, publicToken},
      });

      console.log('prayer', prayer);
      this.setState({
        visible: true,
        loading: false,
        msg: prayer.data,
        type: 's',
        body: '\n\n\n',
        fullName: '',
      });
      // navigation.navigate('RegisterEmailExistScreen');
    } catch (error) {
      this.setState({
        visible: true,
        type: 'w',
        loading: false,
        msg: error.response.data,
      });
      console.log('error', error.response);
      console.log('error', error);
    }
  };

  handleAdd = () => {
    // const resetAction = StackActions.reset({
    //   index: 0,
    //   actions: [
    //     NavigationActions.navigate({
    //       routeName: 'AddPersonalPrayerRequestScreen',
    //     }),
    //   ],
    // });

    // this.props.navigation.dispatch(resetAction);
  };

  handleClose = () => {
    this.setState({visible: false, msg: ''});
  };

  render() {
    const {navigation} = this.props;
    const {
      subject,
      visible,
      type,
      msg,
      email,
      phoneNumber,
      body,
      loading,
      login
    } = this.state;

    return (
      <ThemeContext.Consumer>
        {({theme, baseColor}) => (
          <View style={[classes.root, {backgroundColor: theme.background}]}>
            <Wrapper>
              <KeyboardAvoidingView
                behavior="padding"
                enabled
                style={classes.form}>
                <TextInput
                  label="Email"
                  mode="outlined"
                  autoFocus={true}
                  style={classes.TextInput}
                  enablesReturnKeyAutomatically={true}
                  spellCheck={true}
                  value={email}
                  onChangeText={email => this.setState({email})}
                />
                <TextInput
                  label="Subject"
                  enablesReturnKeyAutomatically={true}
                  mode="outlined"
                  style={classes.TextInput}
                  spellCheck={true}
                  value={subject}
                  onChangeText={subject => this.setState({subject})}
                />
                <TextInput
                  label="Phone Number"
                  mode="outlined"
                  style={classes.TextInput}
                  autoCompleteType="tel"
                  type="tel"
                  enablesReturnKeyAutomatically={true}
                  value={phoneNumber}
                  onChangeText={phoneNumber => this.setState({phoneNumber})}
                />
                <TextInput
                  mode="outlined"
                  label="Body"
                  placeholder="Type your prayer request here."
                  multiline
                  style={classes.TextInput}
                  spellCheck={true}
                  numberOfLines={5}
                  maxLength={225}
                  value={body}
                  onChangeText={body => this.setState({body})}
                />
                <Button
                  contentStyle={classes.innerButton}
                  mode="contained"
                  disabled={loading}
                  color={baseColor}
                  dark={true}
                  style={classes.button}
                  uppercase
                  onPress={this.handlePrayrequest}>
                  Submit
                </Button>
              </KeyboardAvoidingView>

              {/* login modal  */}
              {/* <AuthComponent open={login} handleClose={this.handleAuthClose} /> */}
            </Wrapper>
            <SnackbarComponent
              visible={visible}
              msg={msg}
              type={type}
              handleClose={this.handleClose}
            />
          </View>
        )}
      </ThemeContext.Consumer>
    );
  }
}

export default connect(mapStateToProps)(PersonalPrayRequest);

const classes = StyleSheet.create({
  root: {
    flex: 1,

  },
  form: {
    flex: 1,
    // justifyContent: "center",
    // paddingHorizontal: 5,
    margin: 10
  },
  headerRight: {
    flex: 1,
    justifyContent: 'flex-end',
    marginHorizontal: 15,
    alignItems: 'center',
    flexDirection: 'row',
  },
  surface: {
    // flex: 1,
    // marginVertical: 0.5,
    alignItems: 'flex-start',
    textAlign: 'left',
    paddingHorizontal: 5,
    paddingTop: 5,
    elevation: 1,
  },
  left: {
    alignItems: 'center',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  Subheading: {
    flex: 1,
    fontWeight: '500',
    padding: 0,
    margin: 0,
  },
  para: {
    fontSize: 12,
  },
  title: {flex: 1, justifyContent: 'flex-start'},
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  loadMoreBtn: {
    padding: 10,
    backgroundColor: '#800000',
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
  },
  bottom: {
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
  },
  count: {
    paddingHorizontal: 5,
  },
  split: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // width: '100%',
    alignItems: 'center',
  },
  innerButton: {
    height: 50,
    fontSize: 20,
  },
  button: {
    width: width / 2.4,
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    // borderRadius: 30,
    marginTop: 5,
  },
  accNameTextField: {
    width: width / 2.4,
    height: 56,
  },
});
