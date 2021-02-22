import React, {Component} from 'react';
import {
  IconButton,
  Subheading,
  Paragraph,
  Avatar,
  Button,
} from 'react-native-paper';
import {View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {accountAction} from '../../../store/actions';
import Axios from 'axios';
import {api, publicToken} from '../../../api';
import {ThemeContext} from '../../../context/ThemeContext';
import img from '../../../images';

// import {
//   GoogleSignin,
//   GoogleSigninButton,
//   statusCodes,
// } from '@react-native-community/google-signin';

// function mapStateToProps(state) {
//   return {
//     account: state.account,
//   };
// }

// const mapDispatchToprops = {
//   updateUserData,
//   updateToken,
//   updateRefreshToken,
// };

const ProfileHome = ({ navigation: { navigate } }) => {
  const account = useSelector(({account}) => account);
  // state = {
  //   loading: "",
  //   visible: false,
  //   type: "",
  //   msg: "",
  //   user: null,
  //   token: null
  // };

  // handleLogOut = async () => {
  //   const {account, navigation, updateToken, updateRefreshToken} = this.props;
  //   try {

  //     await Axios.get(api.logout, { headers: { "x-auth-token": account.token, publicToken } });
  //     // const savedEvents = await AsyncStorage.getItem('savedEvents');
  //     // const favouriteDevotion = await AsyncStorage.getItem('favouriteDevotion');
  //     // const favouriteHymn = await AsyncStorage.getItem('favouriteHymn');

  //     // console.log('savedEvents', savedEvents);
  //     // console.log('favouriteDevotion', favouriteDevotion);
  //     // console.log('favouriteHymn', favouriteHymn);

  //     // save backup that where added to the phone database when the user wasn't authenticated
  //     // const backup = await Axios.put(
  //     //   api.backups,
  //     //   {
  //     //     savedEvents: savedEvents ? JSON.parse(savedEvents) : [],
  //     //     favouriteDevotion: favouriteDevotion ? JSON.parse(favouriteDevotion) : [],
  //     //     favouriteHymn: favouriteHymn ? JSON.parse(favouriteHymn) : [],
  //     //   },
  //     //   {headers: {'x-auth-token': token}},
  //     // );

  //     // this.setState({
  //     //   loading: '',
  //     //   visible: true,
  //     //   msg: backup.data,
  //     //   type: 's',
  //     // });

  //     // console.log('backup', backup);

  //     updateUserData(null),
  //     updateToken(null),
  //     updateRefreshToken(null),

  //     await AsyncStorage.removeItem('token');
  //     await AsyncStorage.removeItem('refreshToken');
  //     // await AsyncStorage.removeItem('savedEvents');
  //     // await AsyncStorage.removeItem('favouriteDevotion');
  //     // await AsyncStorage.removeItem('favouriteHymn');

  //     navigate('Login');

  //   } catch (error) {
  //     console.log('error', error);
  //     console.log('error', error.response);
  //     this.setState({
  //       loading: '',
  //       visible: true,
  //       msg: error.response.data,
  //       type: 'w',
  //     });
  //     updateUserData(null),
  //     updateToken(null),
  //     updateRefreshToken(null),
  //     await AsyncStorage.removeItem('token');
  //     await AsyncStorage.removeItem('refreshToken');
  //   }
  // }

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
                    source={img.user}
                  />
                ) : (
                  <Avatar.Image
                    size={150}
                    style={{
                      backgroundColor: 'white',
                    }}
                    source={{
                      uri: api.img + account.user.img.key,
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
                  onPress={() => navigate('ProfileEditScreen')}
                  contentStyle={classes.buttonContent}
                  style={classes.button}>
                  Edit Profile
                </Button>
              </View>
            )}

            <TouchableOpacity
              style={classes.surface}
              onPress={() => navigate('NoteScreen')}>
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
                navigate('PersonalPrayerRequest')
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
              onPress={() => navigate('ProfileSavedEventScreen')}
              style={classes.surface}>
              <View style={classes.left}>
                <Icon
                  name="calendar-multiple-check"
                  color={theme.icon}
                  style={classes.icon}
                  size={25}
                />
                <Subheading style={classes.Subheading}>Saved Events</Subheading>
              </View>
              <IconButton icon="chevron-right" size={25} />
            </TouchableOpacity>
            <TouchableOpacity
              // onPress={this.handleLogOut}
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
};

export default ProfileHome;

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
            onPress={() => navigate('NotificationScreen')}>
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
