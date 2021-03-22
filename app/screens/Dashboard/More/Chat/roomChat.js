import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { ChatInput, Message } from '../../../../components/Chat';

const RoomChat = () => {
  return (
    <KeyboardAvoidingView
      enabled={Platform.OS === 'ios'}
      behavior="position"
      keyboardVerticalOffset={Platform.select({
        ios: 70,
        android: 0,
      })}
      style={classes.root}>
      <FlatList
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
        keyExtractor={(item, i) => i.toString()}
        renderItem={({item}) => <Message />}
      />
      <ChatInput />
    </KeyboardAvoidingView>
  );
}

export default RoomChat

const classes = StyleSheet.create({
  root: {flex: 1},
});