import React, {Component} from 'react';
import {
  Paragraph,
  Snackbar,
  IconButton,
  Title,
  TextInput,
  Button,
} from 'react-native-paper';
import {
  View,
  Dimensions,
  StyleSheet,
  Keyboard,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
import {connect} from 'react-redux';
import axios from "axios";
import {config, publicToken} from '../config';
import SnackbarComponent from '../components/Snackbar';
import {ThemeContext} from '../components/ThemeContext';


function mapStateToProps(state) {
  return {
    // setting: state.setting,
    account: state.account,
  };
}


class PrayRequest extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerLeft: (
        <IconButton
          icon="arrow-back"
          onPress={() => navigation.navigate('PersonalPrayerRequestScreen')}
          size={30}
        />
      ),
      headerTitle: (
        <Paragraph style={classes.title}>
          Send A Personal Pray Request
        </Paragraph>
      ),
    };
  };

  state = {
    title: '',
    email: '',
    phoneNumber: '',
    body: '\n\n\n',
    visible: false,
    loading: false,
    msg: '',
    type: '',
  };

  handlePrayrequest = async () => {
    try {
      const {title, body} = this.state;
      const {navigation, account} = this.props;

      Keyboard.dismiss();

      this.setState({
        visible: false,
        loading: true,
        msg: '',
      });

      const prayer = await axios({
        method: 'post',
        data: {
          title,
          body,
        },
        url: config.createPR,
        headers: {
          'x-auth-token': account.token,
          publicToken
        },
      });

      console.log('prayer', prayer);
      this.setState({
        visible: true,
        loading: false,
        msg: prayer.data,
        type: 's',
        body: '',
        title: '',
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
    }
  };

  handleClose = () => {
    this.setState({visible: false, msg: ''});
  };

  render() {
    const {navigation} = this.props;
    const {title, body, visible, msg, loading, type} = this.state;

    console.log(this.state);

    return (
      <ThemeContext.Consumer>
        {({theme, baseColor}) => (
          <KeyboardAvoidingView
            style={[classes.root, {backgroundColor: theme.background}]}
            behavior="height"
            enabled>
            <Title>Have A Prayer Request?</Title>
            <Paragraph>There is nothing too hard for God to do...</Paragraph>

            <TextInput
              label="Subject"
              mode="outlined"
              style={classes.TextInput}
              spellCheck={true}
              autoFocus={true}
              value={title}
              onChangeText={title => this.setState({title})}
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

            <Paragraph style={classes.sub}>
              Please Drop your contact infomation
            </Paragraph>

            <TextInput
              label="Email Address"
              mode="outlined"
              style={classes.TextInput}
              spellCheck={true}
              autoFocus={true}
              value={title}
              onChangeText={title => this.setState({title})}
            />

            <TextInput
              label="Phone Number (optional)"
              mode="outlined"
              spellCheck={true}
              style={classes.TextInput}
              autoFocus={true}
              value={title}
              onChangeText={title => this.setState({title})}
            />

            <Button
              contentStyle={classes.innerButton}
              // style={classes.button}
              mode="contained"
              disabled={loading}
              color={baseColor}
              dark={true}
              style={classes.TextInput}
              uppercase
              onPress={this.handlePrayrequest}>
              Submit >>
            </Button>
            <SnackbarComponent
              visible={visible}
              msg={msg}
              type={type}
              handleClose={this.handleClose}
            />
          </KeyboardAvoidingView>
        )}
      </ThemeContext.Consumer>
    );
  }
}

export default connect(mapStateToProps)(PrayRequest);

const classes = StyleSheet.create({
  root: {
    flex: 1,
    // paddingHorizontal: 5,
    padding: 15,
  },
  headerRight: {
    flex: 1,
    justifyContent: 'flex-end',
    marginHorizontal: 15,
    alignItems: 'center',
    flexDirection: 'row',
  },
  innerButton: {
    height: 55,
    fontSize: 20,
  },
  button: {
    width: 100,
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 0,
    marginVertical: 15,
  },
  TextInput: {
    marginVertical: 10
  },
  sub: {
    marginTop: 30
  }
});
