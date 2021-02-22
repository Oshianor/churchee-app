import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  Button,
  Title,
  Paragraph,
  TextInput,
  Caption,
  Colors,
  Avatar,
  IconButton,
  Subheading
} from 'react-native-paper';
import {View, StyleSheet, KeyboardAvoidingView, ScrollView, Keyboard, StatusBar, Dimensions, TouchableOpacity} from 'react-native';
import Axios from 'axios';
import {config, publicToken} from '../config';
import AsyncStorage from '@react-native-community/async-storage';
import SnackBarComponent from "../components/Snackbar";
import {updateUserData,  updateToken, updateRefreshToken} from '../store/actions/index.action';
import ImagePicker from 'react-native-image-picker';
import {ThemeContext} from '../components/ThemeContext';


const mapStateToProps = (state) => ({
  account: state.account,
})


const mapDispatchToProps = {
  updateUserData,
  updateToken,
  updateRefreshToken,
};

const screen = Dimensions.get("screen");



const options = {
  title: 'Select Avatar',
  // customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};


class ProfileEdit extends Component {
  constructor(props) {
    super(props);

    this.redirect = null;
    // this.message = null;

    this.state = {
      email: '',
      fullName: '',
      bio: '',
      img: null,
      newPassword: '',
      currentPassword: '',
      confirmNewPassword: '',
      loading: '',
      visible: false,
      type: '',
      msg: '',
      token: null,
    };
  }

  async componentDidMount() {
    const { navigation, account} = this.props;

    console.log('account', account);
    
    // const user = navigation.getParam('user', {});
    const token = await AsyncStorage.getItem("token");


    this.setState({
      fullName: account.user.fullName,
      bio: typeof account.user.bio === 'undefined' ? '' : account.user.bio,
      email: account.user.email,
      img: account.user.img ? config.img + account.user.img.key : null,
      token
    });
  }

  handleProfileDetailsUpdate = async () => {
    const {fullName, bio, token} = this.state;
    const {account, updateUserData} = this.props;

    Keyboard.dismiss();
    this.handleClose();

    try {
      this.setState({
        loading: 'profile',
      });

      const profile = await Axios.put(
        config.profile,
        {bio, fullName},
        { headers: { 'x-auth-token': token, publicToken}},
      );

      console.log('profile', profile);

      this.setState({
        loading: '',
        visible: true,
        msg: profile.data,
        type: 's',
      });

      // get the user data
      const user = await Axios.get(config.getMe, {
        headers: {'x-auth-token': token, publicToken},
      });

      // updateUserData(user.data);
      await AsyncStorage.setItem('user', JSON.stringify(user.data));

    } catch (error) {
      this.setState({
        loading: '',
        visible: true,
        msg: error.response.data,
        type: 'w',
      });
      console.log('error', error);
      console.log('error', error.response);
    }
  }

  handlePasswordChange = async () => {
    const {currentPassword, newPassword, confirmNewPassword} = this.state;
    const {account, navigation, updateToken, updateRefreshToken} = this.props;

    Keyboard.dismiss();
    this.handleClose();


    try {
      this.setState({
        loading: 'password'
      });


      const changePassword = await Axios.put(
        config.changePassword,
        { currentPassword, confirmNewPassword, newPassword },
        { headers: { 'x-auth-token': account.token, publicToken}},
      );

      console.log('changePassword', changePassword);
      this.setState({
        visible: true,
        msg: changePassword.data,
        type: 's',
      });

      this.handleClose();

      this.setState({
        visible: true,
        msg: 'Starting local backup process...',
        type: 'w',
      });

      if (changePassword) {
        try {
          const savedEvents = await AsyncStorage.getItem('savedEvents');
          const favouriteDevotion = await AsyncStorage.getItem('favouriteDevotion');
          const favouriteHymn = await AsyncStorage.getItem('favouriteHymn');

          // console.log('savedEvents', savedEvents);
          // console.log('favouriteDevotion', favouriteDevotion);
          // console.log('favouriteHymn', favouriteHymn);

          const backup = await Axios.put(
            config.backups,
            {
              savedEvents: savedEvents ? JSON.parse(savedEvents) : [],
              favouriteDevotion: favouriteDevotion ? JSON.parse(favouriteDevotion) : [],
              favouriteHymn: favouriteHymn ? JSON.parse(favouriteHymn) : [],
            },
            { headers: { 'x-auth-token': account.token, publicToken}},
          );
          this.handleClose();

          this.setState({
            loading: '',
            visible: true,
            msg: backup.data,
            type: 's',
          });

          console.log('backup', backup);

          // updateToken(null);
          // updateRefreshToken(null);
          await AsyncStorage.removeItem('token');
          await AsyncStorage.removeItem('refreshToken');
          await AsyncStorage.removeItem('savedEvents');
          await AsyncStorage.removeItem('favouriteDevotion');
          await AsyncStorage.removeItem('favouriteHymn');

          this.redirect = setTimeout(() => {
            navigation.navigate('Welcome');
          }, 3000);
        } catch (error) {
          this.setState({
            loading: '',
            visible: true,
            msg: error.response.data,
            type: 'w',
          });

          await AsyncStorage.removeItem('token');
          await AsyncStorage.removeItem('refreshToken');

          this.redirect = setTimeout(() => {
            navigation.navigate('Welcome');
          }, 3000);
          console.log('error', error);
          console.log('error', error.response);
        }
      }
    } catch (error) {
      this.setState({
        loading: '',
        visible: true,
        msg: error.response.data,
        type: 'w',
      });
      console.log('error', error);
      console.log('error', error.response);
    }

    
  };

  handleClose = () => {
    this.setState({
      visible: false,
      type: '',
      msg: '',
    });
  };

  handleImageLoad = () => {
    const {account} = this.props;

    ImagePicker.showImagePicker(options, async (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        // const source = {uri: response.uri};

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          img: 'data:image/jpeg;base64,' + response.data,
        });
        try {
          const profile = await Axios.put(
            config.image,
            {
              img: 'data:image/jpeg;base64,' + response.data,
            },
            { headers: { 'x-auth-token': account.token, publicToken}},
          );

          console.log('profile', profile);
          

          this.setState({
            visible: true,
            type: 's',
            msg: profile.data
          })
        } catch (error) {
          this.setState({
            visible: true,
            type: 'w',
            msg: error.response.data,
          });
        }
        
      }
    });
  }

  render() {
    const {navigation, account} = this.props;
    const {
      newPassword,
      confirmNewPassword,
      currentPassword,
      bio,
      email,
      fullName,
      loading,
      visible,
      type,
      msg,
      img,
    } = this.state;

    console.log('this.state', this.state);
    // const user = navigation.getParam('user', {});
    
    
    return (
      <ThemeContext.Consumer>
        {({theme, baseColor}) => (
      <View style={[classes.rooty, {backgroundColor: theme.background}]}>
        <KeyboardAvoidingView behavior="position">
          <ScrollView>
            <StatusBar
              backgroundColor="green"
              barStyle="light-content"
              hidden={true}
              showHideTransition={true}
              networkActivityIndicatorVisible={true}
            />
            <View style={classes.profile}>
              <TouchableOpacity onPress={this.handleImageLoad}>
                {!img ? (
                  <Avatar.Image
                    size={150}
                    style={classes.img}
                    source={require('../assets/icons/user.png')}
                  />
                ) : (
                  <Avatar.Image
                    size={150}
                    style={classes.img}
                    source={{uri: img}}
                  />
                )}
              </TouchableOpacity>
              <Subheading style={classes.name}>
                {fullName}
              </Subheading>
            </View>

            <View style={classes.root}>
              <View style={classes.accNameRoot}>
                <Subheading style={classes.Subheading}>
                  Account Details
                </Subheading>
                <TextInput
                  label="Email"
                  mode="outlined"
                  disabled={true}
                  value={email}
                  // onChangeText={email => this.setState({email})}
                />
                <TextInput
                  label="Last Name"
                  dense={true}
                  // style={classes.accNameTextField}
                  mode="outlined"
                  value={fullName}
                  onChangeText={fullName => this.setState({fullName})}
                />
                
                <TextInput
                  label="Bio"
                  mode="outlined"
                  multiline={true}
                  value={bio}
                  onChangeText={bio => this.setState({bio})}
                />
              </View>
              <Button
                mode="contained"
                disabled={loading === 'profile'}
                color="white"
                onPress={this.handleProfileDetailsUpdate}
                contentStyle={classes.buttonContent}
                style={classes.button}>
                Save Edits
              </Button>
            </View>
            {account.user.type === 'system' && (
              <View style={classes.root}>
                <View style={classes.accNameRoot}>
                  <Subheading style={classes.Subheading}>
                    Change Password
                  </Subheading>
                  <TextInput
                    label="Current Password"
                    secureTextEntry={true}
                    mode="outlined"
                    value={currentPassword}
                    onChangeText={currentPassword =>
                      this.setState({currentPassword})
                    }
                  />
                  <TextInput
                    label="New Password"
                    secureTextEntry={true}
                    mode="outlined"
                    value={newPassword}
                    onChangeText={newPassword => this.setState({newPassword})}
                  />
                  <TextInput
                    label="Confirm New Password"
                    secureTextEntry={true}
                    mode="outlined"
                    value={confirmNewPassword}
                    onChangeText={confirmNewPassword =>
                      this.setState({confirmNewPassword})
                    }
                  />
                </View>
                <Button
                  mode="contained"
                  color="white"
                  contentStyle={classes.buttonContent}
                  style={classes.button}
                  onPress={this.handlePasswordChange}
                  disabled={loading === 'password'}>
                  Update Password
                </Button>
              </View>
            )}
          </ScrollView>
        </KeyboardAvoidingView>
        <SnackBarComponent
          visible={visible}
          type={type}
          msg={msg}
          handleClose={this.handleClose}
        />
      </View>
      )}
      </ThemeContext.Consumer>
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ProfileEdit);

const classes = StyleSheet.create({
  rooty: {
    flex: 1,
  },
  root: {
    marginHorizontal: 25,
  },
  profile: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#4cd964',
  },
  img: {
    // flex: 1,
    backgroundColor: 'white',
    marginTop: 30,
  },
  name: {
    fontSize: 18,
    // color: 'white',
    marginVertical: 20,
    fontWeight: '500',
  },
  bio: {
    textAlign: 'center',
  },
  buttonContent: {
    color: 'black',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
    width: "100%",
    // width: screen.width / 2,
    borderRadius: 30,
  },
  accNameBody: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  accNameTextField: {
    width: screen.width / 2.4,
    height: 56,
  },
  Subheading: {
    fontWeight: '600',
  },
});
