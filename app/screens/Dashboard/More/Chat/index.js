import React from 'react';
import { StyleSheet, View } from "react-native";
import { CreateRoom, Room } from '../../../../components/Card';
import {useSelector, useDispatch} from 'react-redux';


const ChatHome = ({ navigation: { navigate } }) => {
  const {
    user
  } = useSelector(({account}) => account);

  return (
    <View style={classes.root}>
      <View style={classes.section}>
        {user?.type === 'church' && (
          <CreateRoom onPress={() => navigate('CreateRoom')} />
        )}
        {/* <Room onPress={() => navigate('RoomChat')} /> */}
      </View>
      {/* <View style={classes.section}>
        <Room onPress={() => navigate('RoomInfo')} />
        <Room onPress={() => navigate('RoomInfo')} />
      </View> */}
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