import React from 'react';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {ThemeContext} from '../../../context/ThemeContext';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import img from '../../../images';
import { accountAction } from '../../../store/actions';
import { useDispatch } from "react-redux";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {  api} from "../../../api";
import axios from "axios";
import { useNavigation } from "@react-navigation/native"

GoogleSignin.configure({
  webClientId:
    '757004168289-4rhgu5f93sn0jjlfprdmqopmhjmt6ukp.apps.googleusercontent.com',
  iosClientId:
    '757004168289-d0lflgaq9ljffpv1jjp0kiv48d4cblbo.apps.googleusercontent.com', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
});

const Google = () => {
  const { theme: { mode } } = React.useContext(ThemeContext); 
  const dispatch = useDispatch();
  const {goBack} = useNavigation();

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const {user} = await GoogleSignin.signIn();
      
      console.log('user', user);

      const create = await axios.post(api.createAcctMethod, {
        name: user.givenName + ' ' + user.familyName,
        email: user.email,
        sourceID: user.id,
        img: user.photo,
        source: 'google',
      });

      console.log('create', create);

      dispatch(accountAction.updateToken(create.headers['x-auth-token']));
      dispatch(accountAction.updateUserData(create.data.data));

      await AsyncStorage.setItem('token', create.headers['x-auth-token']);
      await AsyncStorage.setItem('user', JSON.stringify(create.data.data));
      await AsyncStorage.setItem('type', 'google');

      goBack();
    } catch (error) {
      console.log('error', error);
      console.log('error', error.response);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
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