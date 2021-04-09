import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {CreateRoom, Room} from '../../../../components/Card';
import {useSelector, useDispatch} from 'react-redux';
import {
  feedbackAction,
  chatAction,
  churchAction,
} from '../../../../store/actions';
import axios from 'axios';
import {dimension} from '../../../../theme';
import {api} from '../../../../api';

const ChatHome = ({navigation: {navigate}}) => {
  const dispatch = useDispatch();
  const {user, token} = useSelector(({account}) => account);
  const {rooms, room, messages} = useSelector(({chat}) => chat);

  React.useEffect(() => {
    getRooms();
  }, []);

  const getRooms = async () => {
    try {

      if (typeof rooms[0] !== "undefined") return;

      dispatch(
        feedbackAction.launch({
          loading: true,
        }),
      );

      const room = await axios.get(api.getRoom, {
        headers: {userAuth: token},
      });

      console.log('room', room);

      dispatch(chatAction.setChat({rooms: room.data.data.reverse()}));
      dispatch(
        feedbackAction.launch({
          loading: false,
        }),
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

  const selectRoom = async (item) => {
    dispatch(
      chatAction.setChat({
        room: item,
        messages: item?.roomID !== room?.roomID ? [] : messages,
      }),
    );
    await joinRoom(item.roomID);
    navigate('RoomChat');
  };

  const joinRoom = async (roomID) => {
    try {
      const member = [
        {
          memberID: user._id,
          memberType: 'MEMBER',
        },
      ];
      const users = await axios.post(`${api.joinRoom}/${roomID}`, member, {
        headers: {userAuth: token},
      });

      console.log('users', users);
    } catch (error) {
      console.log('error', error);
      console.log('error', error.response);
    }
  };

  return (
    <View style={classes.root}>
      <FlatList
        data={rooms}
        keyExtractor={(item) => item.roomID}
        numColumns={2}
        columnWrapperStyle={classes.contain}
        renderItem={({item}) => (
          <Room
            onPress={() => selectRoom(item)}
            name={item.roomName}
            img={item.profileImage}
          />
        )}
      />
    </View>
  );
};

export default ChatHome;

const classes = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 10,
    flexDirection: 'row',
  },
  contain: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
});
