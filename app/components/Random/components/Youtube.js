import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {WebView} from 'react-native-webview';


const Youtube = ({ videoId }) => {
	return (
    <View style={classes.root}>
      {
        <WebView
          source={{
            uri: 'https://www.youtube.com/embed/' + videoId,
          }}
          startInLoadingState={true}
        />
      }
    </View>
  );
}

export default Youtube;

const classes = StyleSheet.create({
  root: {
    flex: 1,
    
    backgroundColor: '#fff',
  },
});
