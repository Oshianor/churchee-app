import React, { Component, useState } from 'react';
import {
  IconButton,
  Subheading,
	Caption,
} from 'react-native-paper';
import {
  View,
  Dimensions,
  StyleSheet,
	Image,
	SafeAreaView,
  Modal,
} from 'react-native';
import Video from 'react-native-video';
import { api } from '../../../api';
import {connect} from 'react-redux';
import moment from 'moment';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import ProgressController from './ProgressBar';
import {ThemeContext} from '../../../context/ThemeContext';


const { width, height } = Dimensions.get('screen');


function mapStateToProps(state) {
  return {
    setting: state.setting,
  };
}

class AudioPlayer extends Component {
  constructor(props) {
    super(props);

    this.player = null;

    this.state = {
      paused: false,
			rate: 1,
			repeat: false,
      duration: 0.0,
      currentTime: 0.0,
      isBuffering: false,
    };
  }

  onLoad = data => {
    // console.log('data-onLoad', data);

    this.setState({ duration: data.duration });
  };

  handleTogglePlay = () => {
    this.setState(state => ({
      paused: !state.paused,
    }));
  };

  handleFastForward = () => {
    const { currentTime } = this.state;

    console.log('this.111111player', this.player);

    this.player.seek(parseFloat(currentTime) + 10);
  };

  onProgress = data => {
		this.setState({
			currentTime: data.currentTime
		})
	};

  handleFastRewind = () => {
    const { currentTime } = this.state;

    console.log('this.00000player', this.player);

    this.player.seek(parseFloat(currentTime) - 10);
  };

  getCurrentTimePercentage(currentTime, duration) {
    if (currentTime > 0) {
      return parseFloat(currentTime) / parseFloat(duration);
    } else {
      return 0;
    }
  }

  onProgressChanged(newPercent, paused) {
    let { duration } = this.state;
    let newTime = (newPercent * duration) / 100;
    this.setState({ currentTime: newTime, paused: paused });
    this.player.seek(newTime);
  }

  render() {
    const { item, open, handleClose, setting } = this.props;
    const { paused, rate, currentTime, duration, repeat } = this.state;

    console.log('iconfig', this.player);

    const completedPercentage =
      this.getCurrentTimePercentage(currentTime, duration) * 100;

    console.log('completedPercentage', completedPercentage);

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={open}
        // presentationStyle="formSheet"
      >
        <ThemeContext.Consumer>
          {({theme, baseColor}) => (
            <SafeAreaView style={classes.container}>
              <View style={classes.top}>
                <Icon
                  onPress={() => handleClose()}
                  name="chevron-down"
                  size={35}
                  color="white"
                />
              </View>

              <View style={classes.surface}>
                <Image
                  style={classes.img}
                  source={{uri: api.img + item.img}}
                />
                <View style={classes.details}>
                  <Subheading style={classes.colorWhite}>
                    {item.title}
                  </Subheading>
                  <Caption style={classes.colorWhite}>
                    {moment(item.createdAt).format('MMMM DD, YYYY')}
                  </Caption>
                </View>
              </View>

              <View style={classes.trackingControls}>
                <ProgressController
                  duration={duration}
                  currentTime={currentTime}
                  percent={completedPercentage}
                  onNewPercent={this.onProgressChanged.bind(this)}
                />
              </View>

              <View style={classes.iconsRoot}>
                <IconButton
                  onPress={this.handleFastRewind}
                  icon="replay-10"
                  size={35}
                  color="white"
                />
                <IconButton
                  onPress={this.handleTogglePlay}
                  icon={paused ? 'play-arrow' : 'pause'}
                  size={35}
                  color="white"
                />
                <IconButton
                  onPress={this.handleFastForward}
                  icon="forward-10"
                  size={35}
                  color="white"
                />
                <IconButton
                  onPress={() =>
                    this.setState(state => ({
                      repeat: !state.repeat,
                    }))
                  }
                  icon={repeat ? 'repeat-one' : 'repeat'}
                  size={35}
                  color={repeat ? baseColor : 'white'}
                />
              </View>

              <Video
                source={{uri: api.img + item.audio}}
                ref={ref => {
                  this.player = ref;
                }}
                rate={rate}
                onBuffer={this.onBuffer}
                onError={this.videoError}
                onLoad={this.onLoad}
                onBuffer={this.onBuffer}
                onProgress={this.onProgress}
                onSeek={this.onSeekComplete}
                ignoreSilentSwitch="ignore"
                // style={classes.backgroundVideo}
                paused={paused}
                audioOnly={true}
                repeat={repeat}
                playInBackground={true}
                playWhenInactive={true}
              />
            </SafeAreaView>
          )}
        </ThemeContext.Consumer>
      </Modal>
    );
  }
}

export default connect(mapStateToProps)(AudioPlayer);


const classes = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.9)',
  },
  top: {
		flex: 0.1,
		justifyContent: "flex-start"
  },
  surface: {
    alignItems: 'center',
    flex: 0.5,
    justifyContent: 'center',
  },
  details: {
    // flex: 0.1
  },
  img: {
    width: width / 1.1,
    height: height / 3,
  },
  iconsRoot: {
    flex: 0.3,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  colorWhite: {
    color: 'white',
    textAlign: 'center',
  },
  trackingControls: {
		flex: 0.02,
		width: "100%"
    // color: 'white',
  },
  progress: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 3,
    overflow: 'hidden',
  },
  innerProgressCompleted: {
    height: 20,
    backgroundColor: '#cccccc',
  },
  innerProgressRemaining: {
    height: 20,
    backgroundColor: '#2C2C2C',
  },
  controlOption: {
    alignSelf: 'center',
    fontSize: 11,
    color: 'white',
    paddingLeft: 2,
    paddingRight: 2,
    lineHeight: 12,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 15,
    marginLeft: 15,
    paddingVertical: 7,
    paddingHorizontal: 10,
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 15,
    marginLeft: 15,
    paddingHorizontal: 10,
    paddingVertical: 7,
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});