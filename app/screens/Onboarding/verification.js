import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
} from 'react-native';
import {Title, Subheading, Paragraph} from 'react-native-paper';
import {dimension, colors} from '../../theme';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {api} from '../../api';
import {useDispatch} from 'react-redux';
import {accountAction, feedbackAction} from '../../store/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Verification = ({
  navigation: {goBack, navigate},
  route: {
    params: {email},
  },
}) => {
  const dispatch = useDispatch();
  // const [value, setValue] = React.useState('');


  const handleVerification = async (token) => {
    try {
      Keyboard.dismiss();
      dispatch(
        feedbackAction.launch({
          loading: true
        }),
      );

      const verify = await axios.post(api.verify, {email, token});

      console.log('verify', verify);

      await AsyncStorage.setItem(
        'token',
        JSON.stringify(verify.headers['x-auth-token']),
      );
      await AsyncStorage.setItem('user', JSON.stringify(verify.data.data));

      dispatch(accountAction.setToken(verify.headers['x-auth-token']));
      dispatch(accountAction.setUserData(verify.data.data));

      dispatch(
        feedbackAction.launch({
          loading: false,
          open: true,
          severity: 's',
          msg: verify.data.msg,
        }),
      );
      // navigate('VerificationCompleted');
      navigate('FindChurch');
    } catch (err) {
      setIsLoading(false);
      if (err.response) {
        const {msg} = err.response.data;
        dispatch(feedbackAction.launch({open: true, severity: 'w', msg}));
        return;
      }
      dispatch(
        feedbackAction.launch({open: true, severity: 'w', msg: `${err}`}),
      );
    }
  };

  // const fetchOTP = () => {
    
  // };

  return (
    <SafeAreaView style={classes.root}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={classes.bodyRoot}>
        <View>
          <View>
            <Title style={classes.bodyTitle}>OTP Verification </Title>
            <Paragraph style={classes.bodyTitleDetails}>
              Enter the 4-digit code sent to you at
            </Paragraph>
          </View>

          <View style={classes.chnageNumberRoot}>
            <Subheading style={classes.chnageNumber}>{email}</Subheading>
          </View>
        </View>

        <OTPInputView
          style={styles.root}
          pinCount={4}
          // code={value} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
          // onCodeChanged={(code) => setValue(code)}
          autoFocusOnLoad
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
          onCodeFilled={(code) => handleVerification(code)}
        />
        {/* <View>
          <Button label="Submit" onPress={handleVerification} />

          <View style={classes.resendRoot}>
            <Subheading
              style={[
                classes.resendRootText,
                // {color: sendForOTP ? colors.green.main : colors.secondary.main},
              ]}
              onPress={fetchOTP}>
              Resend Code in{' '}
            </Subheading>
          </View>
        </View> */}
      </KeyboardAvoidingView>
      <View style={classes.footerRoot} />
    </SafeAreaView>
  );
};

export default Verification;

const classes = StyleSheet.create({
  root: {
    flex: 1,
  },
  headerRoot: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  bodyRoot: {
    flex: 5,
    marginHorizontal: 20,
    justifyContent: 'space-evenly',
  },
  bodyTitle: {
    fontSize: 28,
  },
  bodyTitleDetails: {
    fontSize: 14,
    color: colors.secondary.main,
    fontWeight: '300',
  },
  chnageNumberRoot: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginVertical: 20,
  },
  chnageNumber: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.secondary.main,
  },
  chnageNumberButton: {
    fontSize: 20,
    fontWeight: '300',
    color: colors.primary.main,
  },
  content: {
    fontWeight: '200',
  },
  contentRed: {
    fontWeight: '200',
    color: colors.primary.main,
  },
  textStyle: {
    fontSize: 70,
    marginVertical: 10,
    paddingBottom: 10,
    borderBottomWidth: 2,
    textAlign: 'center',
    width: 70,
    height: 90,
    fontWeight: '500',
    color: 'black',
  },
  containerStyle: {},
  resendRoot: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  resendRootText: {
    fontSize: 16,
    lineHeight: 16,
    paddingBottom: 3,
    fontWeight: '600',
  },
  resendRootCount: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary.main,
  },
  footerRoot: {
    flex: 3,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
});

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  borderStyleBase: {
    // width: 30,
    // height: 90,
  },
  borderStyleHighLighted: {
    borderColor: '#03DAC6',
  },
  underlineStyleBase: {
    width: dimension.APP_WIDTH / 5,
    marginHorizontal: 5,
    height: 70,
    borderWidth: 0,
    borderBottomWidth: 5,
    borderBottomColor: colors.primary.main,
    fontSize: 50,
    lineHeight: 60,
    color: colors.black,
  },
  underlineStyleHighLighted: {
    borderColor: '#03DAC6',
  },
});
