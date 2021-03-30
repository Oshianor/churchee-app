import React from 'react';
import { FlatList, StyleSheet, View } from "react-native";
import { CreateRoom, Room } from '../../../../components/Card';
import {useSelector, useDispatch} from 'react-redux';
import {feedbackAction, chatAction} from '../../../../store/actions';
import axios from "axios"
import { api } from '../../../../api';

const ChatHome = ({ navigation: { navigate } }) => {
  const dispatch = useDispatch();
  const {user, token} = useSelector(({account}) => account);
  const {rooms} = useSelector(({chat}) => chat);

  React.useEffect(() => {
    getRooms();
  }, [])

  const getRooms = async () => {
    try {
      dispatch(
        feedbackAction.launch({
          loading: true,
        }),
      );

      const room = await axios.get(api.getRoom, {
        headers: {userAuth: token},
      });

      console.log('room', room);

      dispatch(
        feedbackAction.launch({
          loading: false,
        }),
      );
      dispatch(
        chatAction.setChat({ rooms: room.data.data }),
      );
    } catch (error) {
      dispatch(
        feedbackAction.launch({
          loading: false,
        }),
      );
      console.log('error', error);
      console.log('error', error.response);
    }
  };

  return (
    <View style={classes.root}>
      <View style={classes.section}>
        {user?.type === 'church' && (
          <CreateRoom onPress={() => navigate('CreateRoom')} />
        )}
        <FlatList
          data={rooms}
          keyExtractor={(item) => item.roomID}
          renderItem={({item}) => <Room onPress={() => navigate('RoomChat')} />}
        />
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