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
  const flatlistRef = React.useRef(null);

  React.useEffect(() => {
    getMessage();
    getRoomMembers();
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
            receiverID: user._id,
            roomID: body.roomID,
            senderID: body.senderID,
          },
          {
            headers: {
              UserAuth: token,
            },
          },
        );

        console.log('msg12343', msg);

        msg.data.forEach(async element => {
          await messageStatus(body, element.messageID);
        });;

        const newMsg = [...messages, ...msg.data];
        dispatch(chatAction.setChat({messages: newMsg}));

      } catch (error) {
        console.log('error', error);
        console.log('error', error.response);
      }
    });
  };

  const messageStatus = async (body, messageID) => {
    try {
      socket.send(
        '/chatApp/messageStatus',
        {
          UserAuth: token,
        },
        JSON.stringify({
          messageType: 'ONETOGROUP',
          roomID: body.roomID,
          senderID: body.senderID,
          messageID,
          receiverID: user._id,
          messageStatus: 'DELIVERED',
        }),
      );
      // const msg = await axios.post(
      //   `${api.messageStatus}`,
      //   {
      //     messageType: 'ONETOGROUP',
      //     roomID: body.roomID,
      //     senderID: body.senderID,
      //     messageID,
      //     receiverID: user._id,
      //     messageStatus: 'DELIVERED',
      //   },
      //   {
      //     headers: {
      //       UserAuth: token,
      //     },
      //   },
      // );

      // console.log('msg', msg);

      // dispatch(chatAction.setChat({messages: newMsg}));
    } catch (error) {
      console.log('error', error);
      console.log('error', error.response);
    }
  };

  const getRoomMembers = async () => {
    try {
      const msg = await axios.get(`${api.getMembers}/${room.roomID}`, {
        headers: {
          UserAuth: token,
        },
      });

      console.log('msg', msg);

      // dispatch(chatAction.setChat({messages: newMsg}));
    } catch (error) {
      console.log('error', error);
      console.log('error', error.response);
    }
  };

  return (
    <View style={classes.root}>
      <View style={classes.container}>
        <FlatList
          data={messages}
          keyExtractor={(item) => item.messageID}
          renderItem={({item}) => <Message item={item} />}
          ref={flatlistRef}
          onContentSizeChange={() =>
            flatlistRef.current.scrollToEnd({animated: true})
          }
          onLayout={() => flatlistRef.current.scrollToEnd({animated: true})}
        />
      </View>
      <KeyboardAvoidingView
        enabled={Platform.OS === 'ios'}
        behavior="position"
        keyboardVerticalOffset={Platform.select({
          ios: 70,
          android: 0,
        })}
        // style={classes.root}
        style={{position: 'absolute', left: 0, right: 0, bottom: 0}}>
        <ChatInput />
      </KeyboardAvoidingView>
    </View>
  );
};

export default RoomChat;

const classes = StyleSheet.create({
  root: {flex: 1, position: 'relative'},
  container: {
    paddingBottom: 100
  },
});
