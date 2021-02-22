import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  Button,
  Title,
  Paragraph,
  TextInput
} from 'react-native-paper';
import {View, StyleSheet, Keyboard, KeyboardAvoidingView} from 'react-native';
import axios from 'axios';
import {api} from '../../api';
import {ThemeContext} from '../../context/ThemeContext';


const Forgot = ({navigation: {navigate}}) => {
  const dispatch = useDispatch();
  const [email, setEmail] = React.useState("");

  const handleEmail = async () => {
    try {
      const {email} = this.state;

      Keyboard.dismiss();

      const emailExist = await axios.post(
        api.reset,
        {email}
      );

      console.log('emailExist', emailExist);
      dispatch(
        feedbackAction.launch({
          open: true,
          severity: 'w',
          msg: emailExist.data,
          loading: false,
        }),
      );
    } catch (error) {
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
        {({theme, baseColor}) => (
          <View
            style={[classes.container, {backgroundColor: theme.background}]}>
            <KeyboardAvoidingView style={classes.root}>
              <View style={classes.headingText}>
                <Title style={{fontSize: 22}}>Forgot your Password...</Title>
                <Paragraph>Kindly provide your email address.</Paragraph>
              </View>

              {/* <View> */}
              <TextInput
                label="Email"
                mode="outlined"
                value={email}
                onChangeText={(email) => this.setEmail(email)}
              />

              <Button
                contentStyle={classes.innerButton}
                style={classes.button}
                mode="contained"
                color={baseColor}
                dark={true}
                uppercase
                onPress={handleEmail}>
                Reset >>
              </Button>
              {/* </View> */}
            </KeyboardAvoidingView>
          </View>
        )}
      </ThemeContext.Consumer>
    );
}

const classes = StyleSheet.create({
  root: {
    // flex: 1,
    marginHorizontal: 30,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
  },
  headingText: {
    marginVertical: 40,
  },
  button: {
    width: 100,
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 0,
    marginVertical: 15,
  },
  innerButton: {
    height: 55,
    fontSize: 20,
  },
  skip: {
    justifyContent: 'center',
    marginVertical: 30,
    alignItems: 'center',
  },
});
export default Forgot;
