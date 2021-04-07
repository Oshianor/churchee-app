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
import {Surface, Title, Subheading, Caption} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {accountAction, feedbackAction} from '../../store/actions';
import {ThemeContext} from '../../context/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {api} from '../../api';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import {validateEmail} from '../../utils';
import img from '../../images';
import {GoogleAuth} from '../../components/Auth';

const {height} = Dimensions.get('window');

const Login = ({navigation}) => {
  const dispatch = useDispatch();
  const {loading} = useSelector(({feedback}) => feedback);
  const {church, churchList} = useSelector(({church}) => church);
  const [text, setText] = React.useState('');
  const hasUnsavedChanges = Boolean(text);
  const [value, setValue] = React.useState({
    email: '',
    password: '',
  });

  React.useEffect(
    () =>
      navigation.addListener('beforeRemove', (e) => {
        if (!hasUnsavedChanges) {
          // If we don't have unsaved changes, then we don't need to do anything
          return;
        }

        // Prevent default behavior of leaving the screen
        e.preventDefault();

        // Prompt the user before leaving the screen
        // Alert.alert(
        //   'Discard changes?',
        //   'You have unsaved changes. Are you sure to discard them and leave the screen?',
        //   [
        //     {text: "Don't leave", style: 'cancel', onPress: () => {}},
        //     {
        //       text: 'Discard',
        //       style: 'destructive',
        //       // If the user confirmed, then we dispatch the action we blocked earlier
        //       // This will continue the action that had triggered the removal of the screen
        //       onPress: () => navigation.dispatch(e.data.action),
        //     },
        //   ],
        // );
      }),
    [navigation, hasUnsavedChanges],
  );

  const handleLogin = async () => {
    try {
      Keyboard.dismiss();
      dispatch(feedbackAction.launch({loading: true}));

      if (value.password === '') {
        setAlert({
          visible: true,
          msg: 'Password is required',
          type: 'w',
        });
        return;
      }

      if (!validateEmail(value.email)) {
        setAlert({
          visible: true,
          msg: 'Email provided must be valid',
          type: 'w',
        });
        return;
      }

      const login = await axios.post(api.login, {
        ...value,
        email: value.email.toLowerCase(),
      });

      // check if the account is verified.
      if (!login?.data?.data?.verified) {
        dispatch(
          feedbackAction.launch({
            loading: false,
          }),
        );
        navigation.navigate('Verification', {email: login?.data?.data?.email});
        return;
      }

      await AsyncStorage.setItem('token', login.headers['x-auth-token']);
      await AsyncStorage.setItem('user', JSON.stringify(login.data.data));

      dispatch(accountAction.setToken(login.headers['x-auth-token']));
      dispatch(accountAction.setUserData(login.data.data));

      dispatch(
        feedbackAction.launch({
          loading: false,
          open: true,
          severity: 's',
          msg: login.data.msg,
        }),
      );

      setValue({
        email: '',
        password: '',
      });

      if (church) {
        navigation.navigate('Dashboard');
      } else {
        if (typeof churchList[0] === 'undefined') {
          navigation.navigate('findChurch');
        } else {
          navigation.goBack();
        }
      }
    } catch (error) {
      console.log('error', error);
      console.log('error', error.response);
      dispatch(
        feedbackAction.launch({
          open: true,
          severity: 'w',
          msg: error.response.data.msg,
          loading: false,
        }),
      );
    }
  };

  return (
    <ThemeContext.Consumer>
      {({theme}) => (
        <KeyboardAvoidingView
          keyboardVerticalOffset={Platform.OS === 'ios' ? -100 : -150}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={[
            classes.root,
            {backgroundColor: theme.mode ? theme.background : '#f0f0f0'},
          ]}>
          {/* <View
          style={[
            classes.root,
            {backgroundColor: theme.mode ? theme.background : '#f0f0f0'},
          ]}> */}
          <ImageBackground style={classes.header} source={img.login}>
            <View style={classes.headerContent}>
              <Image
                source={theme.mode ? img.loginIconDark : img.loginIconLight}
                style={classes.headerImg}
              />
              <Title
                style={[
                  classes.headerTitle,
                  {color: theme.mode ? 'black' : 'white'},
                ]}>
                THE BRIDGE
              </Title>
            </View>
          </ImageBackground>

          <Surface style={classes.body}>
            <Title style={classes.bodyTitle}>Welcome</Title>
            <Subheading style={classes.bodySubheading}>
              Sign in to get started
            </Subheading>
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
              style={classes.forgot}
              onPress={() => navigation.navigate('Forgot')}>
              <Caption style={classes.forgotText}>Forgot Password?</Caption>
            </TouchableOpacity>

            <TouchableOpacity
              style={classes.button}
              disabled={loading}
              onPress={handleLogin}>
              <Subheading
                style={[
                  classes.buttonText,
                  {color: theme.mode ? 'black' : 'white'},
                ]}>
                Sign in
              </Subheading>
            </TouchableOpacity>

            <View style={classes.bodyFooter}>
              <View style={classes.bodyFooterLines}>
                <View style={classes.lines} />
                <Caption>or connect using</Caption>
                <View style={classes.lines} />
              </View>
              <View style={classes.bodyFooterIcon}>
                <GoogleAuth />
                {/* <FBLogin setAlert={handleAlert} />
                <GoogleLogin setAlert={handleAlert} /> */}
              </View>
            </View>
          </Surface>

          <View style={classes.footer}>
            <Caption style={classes.forgotText}>Not yet registered?</Caption>
            <TouchableOpacity
              style={classes.forgot}
              onPress={() => navigation.navigate('Register')}>
              <Subheading style={classes.footerButton}>
                CREATE ACCOUNT
              </Subheading>
            </TouchableOpacity>
          </View>
          {/* </View> */}
        </KeyboardAvoidingView>
      )}
    </ThemeContext.Consumer>
  );
};

export default Login;

const classes = StyleSheet.create({
  root: {
    flex: 1,
    // backgroundColor: '#f0f0f0',
  },
  header: {
    width: '100%',
    height: Platform.OS === 'ios' ? height / 1.9 : height / 1.7,
    alignItems: 'center',
    flex: 0.3,
    // justifyContent: "center"
  },
  headerContent: {
    marginVertical: Platform.OS === 'ios' ? 100 : 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: Platform.OS === 'ios' ? 35 : 25,
    // color: 'white',
    fontWeight: '800',
    textAlign: 'center',
    paddingTop: Platform.OS === 'ios' ? 20 : 10,
  },
  headerImg: {
    width: Platform.OS === 'ios' ? 120 : 100,
    height: Platform.OS === 'ios' ? 120 : 100,
  },
  body: {
    height: height / 1.9,
    marginHorizontal: 20,
    paddingHorizontal: 20,
    borderRadius: 20,
    elevation: 0,
    marginTop: Platform.OS === 'ios' ? -(height / 60) : -(height / 15),
    flex: 0.5,
  },
  bodyTitle: {
    textAlign: 'center',
    fontWeight: '700',
    marginTop: Platform.OS === 'ios' ? 30 : 10,
    fontSize: 25,
  },
  bodySubheading: {
    fontSize: 20,
    marginVertical: Platform.OS === 'ios' ? 10 : 5,
    marginBottom: Platform.OS === 'ios' ? 20 : 5,
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
    // marginRight: 10,
  },
  TextInput: {
    marginHorizontal: 10,
    width: '100%',
  },
  forgot: {
    marginBottom: 10,
  },
  forgotText: {
    // color: 'white',
    fontSize: 13,
    // fontWeight: '600',
  },
  button: {
    height: 45,
    backgroundColor: '#48b6e8',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginVertical: Platform.OS === 'ios' ? 10 : 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
  },
  bodyFooter: {
    // justifyContent: 'center',
    alignItems: 'center',
    marginTop: Platform.OS === 'ios' ? 10 : 0,
    marginBottom: Platform.OS === 'ios' ? 10 : 5,
  },
  bodyFooterIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bodyFooterLines: {
    flexDirection: 'row',
    marginVertical: Platform.OS === 'ios' ? 10 : 5,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  lines: {borderBottomWidth: 1, borderBottomColor: 'grey', width: 100},
  footer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.2,
  },
  footerButton: {
    color: '#48b6e8',
    fontWeight: '600',
    fontSize: 20,
  },
});
