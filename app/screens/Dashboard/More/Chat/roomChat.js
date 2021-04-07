import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {ChatInput, Message} from '../../../../components/Chat';
import WSContext from '../../../../context/websocket';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import {api} from '../../../../api';
import { chatAction  } from "../../../../store/actions"

const RoomChat = () => {
  const dispatch = useDispatch();
  const socket = React.useContext(WSContext);
  const {room, messages} = useSelector(({chat}) => chat);
  const {user, token} = useSelector(({account}) => account);

  React.useEffect(() => {
    getMessage();
  }, []);

  const getMessage = () => {
    socket.subscribe(`/oneToGroupChat/${room?.roomID}/sub`, async (data) => {
      const body = JSON.parse(data.body);
      console.log('body', body);

      try {
        const msg = await axios.post(
          api.poolMessage,
          {
            messageType: 'ONETOGROUP',
            roomID: body.roomID,
            senderID: body.senderID,
          },
          {
            headers: {
              UserAuth: token,
            },
          },
        );

        const newMsg = [...messages, ...msg.data];
        dispatch(chatAction.setChat({messages: newMsg}));

        // console.log('messages', messages);
      } catch (error) {
        console.log('error', error);
        console.log('error', error.response);
      }
    });
  };

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
        data={messages}
        keyExtractor={(item) => item.messageID}
        renderItem={({item}) => <Message item={item} />}
      />
      <ChatInput />
    </KeyboardAvoidingView>
  );
};

export default RoomChat;

const classes = StyleSheet.create({
  root: {flex: 1},
});
