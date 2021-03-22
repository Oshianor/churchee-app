import React from 'react';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {ThemeContext} from '../../../context/ThemeContext';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import img from '../../../images';

GoogleSignin.configure({
  webClientId:
    '757004168289-4rhgu5f93sn0jjlfprdmqopmhjmt6ukp.apps.googleusercontent.com',
  iosClientId:
    '757004168289-d0lflgaq9ljffpv1jjp0kiv48d4cblbo.apps.googleusercontent.com', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
});

const Google = () => {
  const { theme: { mode } } = React.useContext(ThemeContext); 

  const signIn = async () => {
try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    this.setState({ userInfo });
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      // user cancelled the login flow
    } else if (error.code === statusCodes.IN_PROGRESS) {
      // operation (e.g. sign in) is in progress already
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      // play services not available or outdated
    } else {
      // some other error happened
    }
  }
  };

  return (
    <TouchableOpacity onPress={signIn}>
      {mode ? (
        <Image source={img.GoogleIconDark} style={classes.img} />
      ) : (
        <Image source={img.GoogleIconLight} style={classes.img} />
      )}
    </TouchableOpacity>
  );
}

export default Google;

const classes = StyleSheet.create({
  img: {
    width: 55,
    height: 55,
    marginHorizontal: 5,
  },
});