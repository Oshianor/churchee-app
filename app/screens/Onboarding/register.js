import React from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  ImageBackground,
  Dimensions,
  Keyboard,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {
  Surface,
  Title,
  Subheading,
  IconButton,
  Caption,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {accountAction, feedbackAction} from '../../store/actions';
import {ThemeContext} from '../../context/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {api} from '../../api';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import img from '../../images';
import {validateEmail} from '../../utils';

const {height} = Dimensions.get('screen');

const Register = ({navigation: {navigate, goBack}}) => {
  const dispatch = useDispatch();
  // const account = useSelector(({account}) => account);
  const {loading} = useSelector(({feedback}) => feedback);
  const [value, setValue] = React.useState({
    fullName: '',
    email: '',
    password: '',
  });

  const handleLogin = async () => {
    try {
      Keyboard.dismiss();
      dispatch(feedbackAction.launch({ loading: true }));

      if (value.password === '') {
        dispatch(
          feedbackAction.launch({
            open: true,
            severity: 'w',
            msg: 'Password is required',
          }),
        );
        return;
      }

      if (value.fullName === '') {
        dispatch(
          feedbackAction.launch({
            open: true,
            severity: 'w',
            msg: 'Full Name is required',
          }),
        );
        return;
      }

      if (!validateEmail(value.email)) {
        dispatch(
          feedbackAction.launch({
            open: true,
            severity: 'w',
            msg: 'A valid Email is required',
          }),
        );
        return;
      }

      const login = await axios.post(api.createAccount, {
        ...value,
      });

      await AsyncStorage.setItem('token', login.headers['x-auth-token']);
      await AsyncStorage.setItem(
        'refreshToken',
        login.data.content.refreshToken,
      );

      // get the user data
      const user = await axios.get(api.getMe, {
        headers: {
          'x-auth-token': login.headers['x-auth-token'],
        },
      });

      console.log('user', user);

      dispatch(accountAction.updateToken(login.headers['x-auth-token']));
      dispatch(
        accountAction.updateRefreshToken(login.data.content.refreshToken),
      );
      dispatch(accountAction.updateUserData(user.data));

      setValue({
        email: '',
        password: '',
      });

      navigate('Dashboard');
    } catch (error) {
      console.log('error', error);
      console.log('error', error.response);
      dispatch(
        feedbackAction.launch({
          open: true,
          severity: 'w',
          msg: error.response.data,
          loading: false,
        }),
      );
    }
  };

  return (
    <ThemeContext.Consumer>
      {({theme}) => (
        <KeyboardAvoidingView
          // enabled={true}
          keyboardVerticalOffset={Platform.OS === 'ios' ? -100 : -150}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          // contentContainerStyle={classes.root}
          style={[
            classes.root,
            {backgroundColor: theme.mode ? theme.background : '#f0f0f0'},
          ]}>
          <ImageBackground style={classes.header} source={img.register}>
            <View style={classes.headerContent}>
              <View style={classes.headerContentContainer}>
                <IconButton icon="arrow-left" onPress={() => goBack()} />
                <View style={{flexGrow: 1}} />
                <Image
                  source={
                    theme.mode ? img.registerIconDark : img.registerIconLight
                  }
                  style={classes.headerImg}
                />
                <View style={{flexGrow: 1.4}} />
              </View>

              <Title style={classes.bodyTitle}>Welcome</Title>
              <Subheading style={classes.bodySubheading}>
                Sign up to connect with your bridge family
              </Subheading>
            </View>
          </ImageBackground>
          <Surface style={classes.body}>
            <View
              style={[
                classes.TextInputRoot,
                {backgroundColor: theme.mode && theme.background},
              ]}>
              <Icon name="account" size={15} style={classes.icons} />
              <TextInput
                style={[classes.TextInput, {color: theme.text}]}
                placeholderTextColor={'#bbbbbb'}
                placeholder="Full Name"
                onChangeText={(fullName) => setValue({...value, fullName})}
                value={value.fullName}
              />
            </View>
            <View
              style={[
                classes.TextInputRoot,
                {backgroundColor: theme.mode && theme.background},
              ]}>
              <Icon name="email" size={20} style={classes.icons} />
              <TextInput
                style={[classes.TextInput, {color: theme.text}]}
                placeholderTextColor={'#bbbbbb'}
                placeholder="Email"
                onChangeText={(email) => setValue({...value, email})}
                value={value.email}
              />
            </View>

            <View
              style={[
                classes.TextInputRoot,
                {backgroundColor: theme.mode && theme.background},
              ]}>
              <Icon name="lock" size={15} style={classes.icons} />
              <TextInput
                placeholder="Password"
                placeholderTextColor={'#bbbbbb'}
                style={[classes.TextInput, {color: theme.text}]}
                secureTextEntry={true}
                onChangeText={(password) => setValue({...value, password})}
                value={value.password}
              />
            </View>

            <TouchableOpacity
              style={classes.button}
              disabled={loading}
              onPress={handleLogin}>
              <Subheading
                style={[classes.buttonText, {color: theme.mode ?? 'black'}]}>
                Sign up
              </Subheading>
            </TouchableOpacity>

            <View style={classes.forgot}>
              <Caption style={classes.forgotText}>
                By signing up, you accept our{' '}
              </Caption>
              <Caption style={classes.forgotLink}>Terms of Services </Caption>
              <Caption style={classes.forgotText}>and </Caption>
              <Caption style={classes.forgotLink}>Privacy Policy </Caption>
            </View>
          </Surface>

          {/* <Surface style={classes.bodyIcons}>
            <View style={classes.bodyFooter}>
              <View style={classes.bodyFooterLines}>
                <View style={classes.lines} />
                <Caption>or connect using</Caption>
                <View style={classes.lines} />
              </View>
              <View style={classes.bodyFooterIcon}>
                <FBLogin setAlert={handleAlert} />
                <GoogleLogin setAlert={handleAlert} />
              </View>
            </View>
          </Surface> */}

          <View style={classes.footer}>
            <Caption style={classes.forgotText}>Already registered?</Caption>
            <TouchableOpacity
              style={classes.forgot}
              onPress={() => navigate('Login')}>
              <Subheading style={classes.footerButton}>SIGN IN</Subheading>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      )}
    </ThemeContext.Consumer>
  );
};

export default Register;

const classes = StyleSheet.create({
  root: {
    flex: 1,
  },
  header: {
    width: '100%',
    height: Platform.OS === 'ios' ? height / 2.8 : height / 2.5,
    alignItems: 'center',
    flex: 0.3,
  },
  headerContentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  headerContent: {
    marginVertical: Platform.OS === 'ios' ? 100 : 50,
    justifyContent: 'center',
    marginHorizontal: 20,
    alignItems: 'center',
    // width: "100%"
  },
  headerImg: {
    width: 45,
    height: 45,
  },
  body: {
    height: height / 1.9,
    marginHorizontal: 20,
    paddingHorizontal: 20,
    borderRadius: 20,
    elevation: 0,
    justifyContent: 'center',
    flex: 0.5,
  },
  bodyIcons: {
    flex: 0.1,
    marginHorizontal: 20,
    marginVertical: 5,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 20,
    elevation: 0,
  },
  bodyTitle: {
    textAlign: 'center',
    fontWeight: '700',
    marginTop: 20,
    fontSize: 25,
  },
  bodySubheading: {
    fontSize: 20,
    marginVertical: 10,
    fontWeight: '500',
    marginBottom: 20,
    textAlign: 'center',
  },
  TextInputRoot: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    backgroundColor: '#f0f0f0',
    paddingVertical: Platform.OS === 'ios' ? 10 : 0,
    paddingHorizontal: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  icons: {
    color: 'grey',
  },
  TextInput: {
    marginHorizontal: 10,
    width: '100%',
  },
  forgot: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  forgotText: {},
  forgotLink: {
    color: '#48b6e8',
  },
  button: {
    height: 45,
    backgroundColor: '#48b6e8',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
  },
  bodyFooter: {
    alignItems: 'center',
    marginTop: Platform.OS === 'ios' ? 0 : 0,
  },
  bodyFooterIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bodyFooterLines: {
    flexDirection: 'row',
    marginVertical: Platform.OS === 'ios' ? 0 : 0,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  lines: {borderBottomWidth: 1, borderBottomColor: 'grey', width: 100},
  footer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.1,
  },
  footerButton: {
    color: '#48b6e8',
    fontWeight: '600',
    fontSize: 20,
  },
});
