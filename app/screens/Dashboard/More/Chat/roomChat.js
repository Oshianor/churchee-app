import React from 'react';
import { View, StyleSheet } from "react-native";
import { ChatInput, Message } from '../../../../components/Chat';

const RoomChat = () => {
  return (
    <View styles={classes.root}>
      <Message />
      <Message />
      <Message />
      <Message />
      <ChatInput />
    </View>
  );
}

export default RoomChat

const classes = StyleSheet.create({
  root: {
    flex: 1,
    // marginHorizontal: 20,
  },
});