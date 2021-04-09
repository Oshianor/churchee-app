import React from 'react';
import { View, StyleSheet, FlatList } from "react-native";
import { ChatInput, Message } from '../../../../components/Chat';

const RoomChat = () => {
  return (
    <View styles={classes.root}>
      {/* <FlatList
        data={[1, 2]}
        keyExtractor={(item, i) => i.toString()}
        renderItem={({item}) => <Message />}
      /> */}
      <ChatInput />
    </View>
  );
}

export default RoomChat

const classes = StyleSheet.create({
  root: {
    flex: 1,
  },
});