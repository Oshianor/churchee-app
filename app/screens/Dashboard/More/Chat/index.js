import React from 'react';
import { StyleSheet, View } from "react-native";
import { CreateRoom, Room } from '../../../../components/Card';

const ChatHome = ({ navigation: { navigate } }) => {
  return (
    <View style={classes.root}>
      <View style={classes.section}>
        <CreateRoom onPress={() => navigate('CreateRoom')} />
        <Room onPress={() => navigate('RoomInfo')} />
      </View>
      <View style={classes.section}>
        <Room onPress={() => navigate('RoomInfo')} />
        <Room onPress={() => navigate('RoomInfo')} />
      </View>
    </View>
  );
}

export default ChatHome

const classes = StyleSheet.create({
  root: {
    flex: 1,
    marginHorizontal: 10
  },
  section: {
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    marginVertical: 10
  },
});