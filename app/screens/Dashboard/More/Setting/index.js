import React, {Component} from 'react';
import {
  Surface,
  Caption,
  IconButton,
  Subheading,
  Colors,
  Paragraph,
  Avatar,
  Title,
  Headline,
  Switch,
  Button,
} from 'react-native-paper';
import {
  View,
  Dimensions,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import {connect} from 'react-redux';
import Slider from '@react-native-community/slider';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  settingAction
} from '../../../../store/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import {firebase} from '@react-native-firebase/messaging';
import {publicToken} from '../../../../api';
import {ThemeContext} from '../../../../context/ThemeContext';
import img from '../../../../images';


function mapStateToProps(state) {
  return {
    account: state.account,
  };
}

const mapDispatchToProps = (dispatch) => ({
  changeBaseColor: (data) => dispatch(settingAction.changeBaseColor(data)),
  changeFontSize: (data) => dispatch(settingAction.changeFontSize(data)),
});

const { width } = Dimensions.get('screen');

class Setings extends Component {
  state = {
    notification: true,
    mode: false,
    fontSize: 20,
    color: '#48b6e8',
  };

  async componentDidMount() {
    const {theme, baseColor, fontSize} = this.context;

    const notification = await AsyncStorage.getItem('pushNotification');

    console.log('notification', notification);

    this.setState({
      mode: theme.mode,
      color: baseColor,
      fontSize: fontSize,
      notification: JSON.parse(notification),
    });
  }

  handleSettingChange = async () => {
    const {changeBaseColor, changeMode, changeFontSize} = this.props;
    const {color, mode, notification} = this.state;
    const {
      toggleTheme,
      updateFontSize,
      updateBaseColor,
      theme,
      fontSize,
      baseColor,
    } = this.context;

    // update context api
    if (baseColor !== color) {
      updateBaseColor(color);
    }

    if (fontSize !== this.state.fontSize) {
      updateFontSize(this.state.fontSize);
    }

    if (theme.mode !== mode) {
      toggleTheme(mode);
    }

    // save settings
    await AsyncStorage.setItem(
      'setting',
      JSON.stringify({mode, color, fontSize}),
    );

    // set push notification status
    await AsyncStorage.setItem(
      'pushNotification',
      JSON.stringify(notification),
    );

    // if (notification) {
    //   await firebase.messaging().subscribeToTopic(publicToken);
    // } else {
    //   await firebase.messaging().unsubscribeFromTopic(publicToken);
    // }
  };

  render() {
    const {setting, changeBaseColor, changeMode, changeFontSize} = this.props;
    const {notification, mode, fontSize, color} = this.state;

    console.log('this.context', this.context);

    // const background = {
    //   backgroundColor: setting.background,
    // };
    return (
      <ThemeContext.Consumer>
        {({theme, baseColor}) => (
          <View style={[classes.root, {backgroundColor: theme.background}]}>
            <ScrollView>
              <Headline style={classes.weight}>Settings</Headline>

              <Surface style={classes.surface}>
                <View style={classes.same}>
                  <IconButton icon="translate" size={25} />
                  <Subheading style={classes.weight}>
                    Default Language
                  </Subheading>
                </View>
                <View style={classes.same}>
                  <Image source={img.usflag} style={classes.img} />
                  <Subheading>English United States</Subheading>
                </View>
              </Surface>

              {/* color themes */}
              <Surface style={[classes.surface, classes.padding]}>
                <Subheading style={classes.weight}>Color Theme</Subheading>
                <View style={classes.colors}>
                  <TouchableOpacity
                    onPress={() => this.setState({color: '#48b6e8'})}>
                    <View style={[classes.color, classes.default]}>
                      {color === '#48b6e8' && (
                        <Icon name="check" size={15} color="white" />
                      )}
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => this.setState({color: '#f00a51'})}>
                    <View style={[classes.color, classes.option1]}>
                      {color === '#f00a51' && (
                        <Icon name="check" size={15} color="white" />
                      )}
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => this.setState({color: '#4cd964'})}>
                    <View style={[classes.color, classes.option2]}>
                      {color === '#4cd964' && (
                        <Icon name="check" size={15} color="white" />
                      )}
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => this.setState({color: '#5856d6'})}>
                    <View style={[classes.color, classes.option3]}>
                      {color === '#5856d6' && (
                        <Icon name="check" size={15} color="white" />
                      )}
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => this.setState({color: '#ff2c55'})}>
                    <View style={[classes.color, classes.option4]}>
                      {color === '#ff2c55' && (
                        <Icon name="check" size={15} color="white" />
                      )}
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => this.setState({color: '#ff9500'})}>
                    <View style={[classes.color, classes.option5]}>
                      {color === '#ff9500' && (
                        <Icon name="check" size={15} color="white" />
                      )}
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => this.setState({color: '#ffcc00'})}>
                    <View style={[classes.color, classes.option6]}>
                      {color === '#ffcc00' && (
                        <Icon name="check" size={15} color="white" />
                      )}
                    </View>
                  </TouchableOpacity>
                </View>
              </Surface>

              <Surface style={classes.surfaceSide}>
                <Subheading style={classes.weight}>
                  Push Notifications
                </Subheading>
                <Switch
                  value={notification}
                  color={baseColor}
                  onValueChange={() => {
                    this.setState({notification: !notification});
                  }}
                />
              </Surface>

              {/* Dark mode activation */}
              <Surface style={classes.surfaceSide}>
                <Subheading style={classes.weight}>Dark Mode</Subheading>
                <Switch
                  value={mode}
                  color={baseColor}
                  onValueChange={() => this.setState({mode: !mode})}
                />
              </Surface>

              <Surface style={[classes.surface, classes.padding]}>
                <Subheading style={classes.weight}>Font Size</Subheading>
                <View style={classes.fonts}>
                  <Slider
                    style={classes.Slider}
                    minimumValue={12}
                    step={1}
                    value={fontSize}
                    // onValueChange={fontSize => changeFontSize(fontSize)}
                    onSlidingComplete={(fontSize) => this.setState({fontSize})}
                    maximumValue={25}
                    minimumTrackTintColor={baseColor}
                    maximumTrackTintColor="#000000"
                  />
                  <Title>{Math.ceil(fontSize)}</Title>
                </View>
              </Surface>

              <Button
                mode="contained"
                style={{
                  borderRadius: 30,
                  marginVertical: 5,
                  paddingVertical: 2,
                }}
                onPress={this.handleSettingChange}>
                Save Changes
              </Button>
            </ScrollView>
          </View>
        )}
      </ThemeContext.Consumer>
    );
  }
}


Setings.contextType = ThemeContext;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Setings);

const classes = StyleSheet.create({
  root: {
    flex: 1,
    padding: 15,
    // margin: 15,
  },
  headerRight: {
    flex: 1,
    justifyContent: 'flex-end',
    marginHorizontal: 15,
    alignItems: 'center',
    flexDirection: 'row',
  },
  surface: {
    padding: 8,
    marginVertical: 10,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    elevation: 4,
  },
  surfaceSide: {
    padding: 20,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 4,
  },
  padding: {
    padding: 20,
  },
  same: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  img: {
    width: 25,
    height: 15,
    marginHorizontal: 10,
  },
  weight: {
    fontWeight: '600',
  },
  colors: {
    flexDirection: 'row',
  },
  color: {
    marginRight: 27,
    marginTop: 25,
    width: 25,
    height: 25,
    borderRadius: 15,
    elevation: 4,
    shadowColor: 'gray',
    shadowOpacity: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  default: {
    backgroundColor: '#48b6e8',
  },
  option1: {
    backgroundColor: '#f00a51',
  },
  option2: {
    backgroundColor: '#4cd964',
  },
  option3: {
    backgroundColor: '#5856d6',
  },
  option4: {
    backgroundColor: '#ff2c55',
  },
  option5: {
    backgroundColor: '#ff9500',
  },
  option6: {
    backgroundColor: '#ffcc00',
  },
  fonts: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  Slider: {width: width / 1.3, height: 40, paddingRight: 15},
});
