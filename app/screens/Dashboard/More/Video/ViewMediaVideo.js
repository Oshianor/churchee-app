
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
} from 'react-native-paper';
import {
  View,
  Dimensions,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  SectionList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux';
import SmallVideoCardComponent from '../components/SmallvideoCard';
import {config} from '../config';
import VideoPlayer from 'react-native-video-controls';
import {ThemeContext} from '../components/ThemeContext';



const Video = ({ route, navigation: { goBack } }) => {
  // console.log("navigate", navigation);
  
  return (
    <View style={classes.root}>
      <VideoPlayer
        source={{
          uri: config.img + route.params.video,
        }}
        tapAnywhereToPause={true}
        // disableBack
        onBack={() => goBack()}
        // _onBack={() => navigate.goBack()}
      />
    </View>
  );
}

export default Video;

const classes = StyleSheet.create({
  root: {
    flex: 1,
  },
  body: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  icon: {
    flexDirection: 'row',
    flex: 0.3,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  title: {flex: 1, justifyContent: 'flex-start', color: "white"},
  download: {
    margin: 10
  }
});


{/* <VideoPlayer link /> */ }
{/* <View style={classes.icon}>
        <IconButton icon="share" size={30} />
        <IconButton icon="favorite-border" size={30} />
        <Icon
          color={setting.icon}
          name="progress-download"
          style={classes.download}
          size={30}
        />
      </View>
      <View style={classes.body}>
        <Subheading>More Videos from this section</Subheading>
        <SmallVideoCardComponent />
      </View> */}