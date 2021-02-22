import React, {Component} from 'react';
import {
  Surface,
  Caption,
  IconButton,
  Subheading,
  Colors,
  Paragraph,
  Avatar,
  Badge,
  Button,
} from 'react-native-paper';
import {
  View,
  Dimensions,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import { updateUserData, updateToken, updateRefreshToken } from "../store/actions/index.action";
import Axios from 'axios';
import { config, publicToken } from '../config';
import {ThemeContext} from '../components/ThemeContext';

// import {
//   GoogleSignin,
//   GoogleSigninButton,
//   statusCodes,
// } from '@react-native-community/google-signin';

function mapStateToProps(state) {
  return {
    account: state.account,
  };
}


const mapDispatchToprops = {
  updateUserData,
  updateToken,
  updateRefreshToken,
};



class ProfileHome extends Component {
  state = {
    newPassword: '',
    currentPassword: '',
    confirmNewPassword: '',
    loading: "",
    visible: false,
    type: "",
    msg: "",
    user: null,
    token: null
  };
  

  handleLogOut = async () => {
    const {account, navigation, updateToken, updateRefreshToken} = this.props;
    try {

      await Axios.get(config.logout, { headers: { "x-auth-token": account.token, publicToken } });
      // const savedEvents = await AsyncStorage.getItem('savedEvents');
      // const favouriteDevotion = await AsyncStorage.getItem('favouriteDevotion');
      // const favouriteHymn = await AsyncStorage.getItem('favouriteHymn');

      // console.log('savedEvents', savedEvents);
      // console.log('favouriteDevotion', favouriteDevotion);
      // console.log('favouriteHymn', favouriteHymn);


      // save backup that where added to the phone database when the user wasn't authenticated
      // const backup = await Axios.put(
      //   config.backups,
      //   {
      //     savedEvents: savedEvents ? JSON.parse(savedEvents) : [],
      //     favouriteDevotion: favouriteDevotion ? JSON.parse(favouriteDevotion) : [],
      //     favouriteHymn: favouriteHymn ? JSON.parse(favouriteHymn) : [],
      //   },
      //   {headers: {'x-auth-token': token}},
      // );

      // this.setState({
      //   loading: '',
      //   visible: true,
      //   msg: backup.data,
      //   type: 's',
      // });

      // console.log('backup', backup);

      updateUserData(null),
      updateToken(null),
      updateRefreshToken(null),

      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('refreshToken');
      // await AsyncStorage.removeItem('savedEvents');
      // await AsyncStorage.removeItem('favouriteDevotion');
      // await AsyncStorage.removeItem('favouriteHymn');

      navigation.navigate('Login');

    } catch (error) {
      console.log('error', error);      
      console.log('error', error.response);  
      this.setState({
        loading: '',
        visible: true,
        msg: error.response.data,
        type: 'w',
      }); 
      updateUserData(null),
      updateToken(null),
      updateRefreshToken(null),
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('refreshToken');   
    }
  }

  // async componentDidMount() {
  //   const {account, navigation} = this.props;

  //   if (!account.token) {
  //     navigation.navigate('Welcome');
  //   }
  // }
  

  handleGoogleLogOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      // this.setState({ user: null }); // Remember to remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
  }
  

  render() {
    const { navigation, account} = this.props;
    

    return (
      <ThemeContext.Consumer>
        {({theme, baseColor}) => (
          <View style={[classes.root, {backgroundColor: theme.background}]}>
            <ScrollView contentContainerStyle={classes.container}>
              {account.user && (
                <View style={classes.profile}>
                  {!account.user.img ? (
                    <Avatar.Image
                      size={150}
                      style={{
                        backgroundColor: 'white',
                      }}
                      source={require('../assets/icons/user.png')}
                    />
                  ) : (
                    <Avatar.Image
                      size={150}
                      style={{
                        backgroundColor: 'white',
                      }}
                      source={{
                        uri: config.img + account.user.img.key,
                      }}
                    />
                  )}

                  {account.user && (
                    <>
                      <Subheading style={classes.name}>
                        {account.user.fullName}
                      </Subheading>
                      <Paragraph style={classes.bio}>
                        {account.user.bio.length > 50
                          ? account.user.bio.substring(0, 50)
                          : account.user.bio}
                      </Paragraph>
                    </>
                  )}

                  <Button
                    mode="contained"
                    color="white"
                    onPress={() =>
                      navigation.navigate('ProfileEditScreen')
                    }
                    contentStyle={classes.buttonContent}
                    style={classes.button}>
                    Edit Profile
                  </Button>
                </View>
              )}

              <TouchableOpacity
                style={classes.surface}
                onPress={() => navigation.navigate('NoteScreen')}>
                <View style={classes.left}>
                  <Icon
                    name="note-text"
                    color={theme.icon}
                    style={classes.icon}
                    size={25}
                  />
                  <Subheading style={classes.Subheading}>Notes</Subheading>
                </View>
                <IconButton icon="chevron-right" size={25} />
              </TouchableOpacity>
              <TouchableOpacity
                style={classes.surface}
                onPress={() =>
                  navigation.navigate('PersonalPrayerRequest', {
                    back: 'ProfileHomeScreen',
                  })
                }>
                <View style={classes.left}>
                  <AwesomeIcon
                    name="hands"
                    color={theme.icon}
                    style={classes.icon}
                    size={20}
                  />
                  <Subheading style={classes.Subheading}>
                    Personal Prayer Requests
                  </Subheading>
                </View>
                <IconButton icon="chevron-right" size={25} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('ProfileSavedEventScreen')}
                style={classes.surface}>
                <View style={classes.left}>
                  <Icon
                    name="calendar-multiple-check"
                    color={theme.icon}
                    style={classes.icon}
                    size={25}
                  />
                  <Subheading style={classes.Subheading}>
                    Saved Events
                  </Subheading>
                </View>
                <IconButton icon="chevron-right" size={25} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this.handleLogOut}
                style={[classes.surface, classes.opacity]}>
                <View style={classes.left}>
                  <Icon
                    name="logout"
                    color={theme.icon}
                    style={classes.icon}
                    size={25}
                  />
                  <Subheading style={classes.Subheading}>Log Out</Subheading>
                </View>
              </TouchableOpacity>
            </ScrollView>
          </View>
        )}
      </ThemeContext.Consumer>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToprops,
)(ProfileHome);

const classes = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    padding: 15,
  },
  profile: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    marginVertical: 10,
    fontWeight: '500',
  },
  bio: {
    textAlign: 'center',
  },
  buttonContent: {
    color: 'black',
  },
  button: {
    marginVertical: 15,
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
    marginVertical: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 5,
    elevation: 4,
  },
  left: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  bibleTypeFontSize: {
    fontSize: 15,
    color: '#4cd964',
  },
  icon: {
    marginRight: 20,
  },
  img: {
    width: 20,
    height: 20,
    marginRight: 20,
  },
  Subheading: {
    fontSize: 18,
  },
  title: {flex: 1, justifyContent: 'flex-start'},
  opacity: {
    opacity: 0.5,
  },
});


              {
                /* <TouchableOpacity
            style={classes.surface}
            onPress={() => navigation.navigate('NotificationScreen')}>
            <View style={classes.left}>
              <Icon
                name="bell-outline"
                color={setting.icon}
                style={classes.icon}
                size={25}
              />
              <Subheading style={classes.Subheading}>Notifications</Subheading>
            </View>
            <IconButton icon="chevron-right" size={25} />
          </TouchableOpacity> */
              }