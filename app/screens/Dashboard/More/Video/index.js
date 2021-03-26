import React, {Component} from 'react';
import VideoPlayer from 'react-native-video-controls';
import { api } from "../../../../api";

const VideoPlayerScreen = ({ route, navigation: { goBack } }) => {
  return (
    <VideoPlayer
      source={{
        uri: api.img + route.params.video,
      }}
      onBack={() => goBack()}
      tapAnywhereToPause={true}
    />
  );
}

export default VideoPlayerScreen;
