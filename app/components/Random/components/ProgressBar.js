import _ from 'lodash';
import React, {Component, PropTypes} from 'react';
import {
  Animated,
  PanResponder,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {connect} from 'react-redux';
import {ThemeContext} from '../../../context/ThemeContext';

let radiusOfHolder = 10;
let radiusOfActiveHolder = 7;

function mapStateToProps(state) {
  return {
    setting: state.setting,
  };
}

class ProgressController extends Component {
  constructor(props, context, ...args) {
    super(props, context, ...args);
    this.state = {
      lineX: new Animated.Value(0),
      slideX: new Animated.Value(0),
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.moving) {
      this.state.slideX.setValue(this.computeScreenX(nextProps.percent));
    }
  }

  computeScreenX(percent) {
    return (percent * this.state.width) / 100;
  }

  componentWillMount() {
    this.holderPanResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderGrant: (e, gestureState) => {
        let {slideX} = this.state;
        this.setState({moving: true});
        slideX.setOffset(slideX._value);
        slideX.setValue(0);
      },
      onPanResponderMove: (e, gestureState) => {
        let totalX = this.state.slideX._offset + gestureState.dx;
        let newPercent = (totalX / this.state.width) * 100;
        this.notifyPercentChange(newPercent, true);
        Animated.event([null, {dx: this.state.slideX}])(e, gestureState);
      },
      onPanResponderRelease: (e, gesture) => {
        this.state.slideX.flattenOffset();
        let newPercent = (this.state.slideX._value / this.state.width) * 100;
        this.setState({moving: false});
        this.notifyPercentChange(newPercent, false);
      },
    });
  }

  notifyPercentChange(newPercent, paused) {
    let {onNewPercent} = this.props;
    if (onNewPercent instanceof Function) {
      onNewPercent(newPercent, paused);
    }
  }

  onLayout(e) {
    this.setState({width: e.nativeEvent.layout.width - radiusOfHolder * 2});
  }

  getHolderStyle() {
    let {moving, slideX, width} = this.state;

    if (width > 0) {
      var interpolatedAnimation = slideX.interpolate({
        inputRange: [0, width],
        outputRange: [0, width],
        extrapolate: 'clamp',
      });
      return [
        styles.holder,
        moving && styles.activeHolder,
        {transform: [{translateX: interpolatedAnimation}]},
      ];
    } else {
      return [styles.holder];
    }
  }

  onLinePressed(e) {
    let newPercent = (e.nativeEvent.locationX / this.state.width) * 100;
    this.notifyPercentChange(newPercent, false);
  }

  formatSeconds(seconds) {
    const format = (val) => `0${Math.floor(val)}`.slice(-2);
    const hours = seconds / 3600;
    const minutes = (seconds % 3600) / 60;

    return [hours, minutes, seconds % 60].map(format).join(':');
  }

  render() {
    let {moving} = this.state;
    let {currentTime, duration, percent, setting} = this.props;
    return (
      <ThemeContext.Consumer>
        {({theme, baseColor}) => (
          <View style={styles.view}>
            <Text style={[styles.timeText, {marginRight: 10}]}>
              {this.formatSeconds(currentTime)}
            </Text>
            <View
              style={styles.barView}
              onLayout={this.onLayout.bind(this)}
              {...this.holderPanResponder.panHandlers}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  top: moving ? radiusOfActiveHolder : radiusOfHolder,
                }}>
                <TouchableOpacity
                  style={[styles.line, {flex: percent, borderColor: baseColor}]}
                  onPress={this.onLinePressed.bind(this)}
                />
                <TouchableOpacity
                  style={[
                    styles.line,
                    {flex: 100 - percent, borderColor: 'white'},
                  ]}
                  onPress={this.onLinePressed.bind(this)}
                />
              </View>
              <Animated.View style={this.getHolderStyle()} />
            </View>
            <Text style={[styles.timeText, {marginLeft: 10}]}>
              {this.formatSeconds(duration)}
            </Text>
          </View>
        )}
      </ThemeContext.Consumer>
    );
  }
}

let height = 40;
let styles = StyleSheet.create({
  view: {flex: 1, flexDirection: 'row', height, alignItems: 'center'},
  barView: {flex: 1},
  timeText: {color: 'white'},
  line: {borderWidth: 1, padding: 0},
  holder: {
    height: radiusOfHolder * 2,
    width: radiusOfHolder * 2,
    borderRadius: radiusOfHolder,
    backgroundColor: 'white',
  },
  activeHolder: {
    height: radiusOfActiveHolder * 2,
    width: radiusOfActiveHolder * 2,
    borderRadius: radiusOfActiveHolder,
    backgroundColor: 'white',
  },
});

// ProgressController.propTypes = {
//   currentTime: PropTypes.number,
//   percent: PropTypes.number,
//   onNewPercent: PropTypes.func,
//   duration: PropTypes.number,
// };

export default connect(mapStateToProps)(ProgressController);
