import React from 'react';
import {View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import { Surface } from 'react-native-paper';
import { Button } from '../../../../components/Button';
import { AddUser } from '../../../../components/List';
import axios from 'axios';
import {api} from '../../../../api';
import {useSelector, useDispatch} from 'react-redux';
import {feedbackAction, churchAction} from '../../../../store/actions';


const AddModerator = ({
  route: {
    params: {room},
  },
  navigation: {navigate},
}) => {
  const dispatch = useDispatch();
  const {token} = useSelector(({account}) => account);
  const {members, selectedMembers, selectedMembersIDs} = useSelector(
    ({church}) => church,
  );

  console.log('room', room);

  React.useEffect(() => {
    getAllMembers();
  }, []);

  const getAllMembers = async () => {
    try {
      dispatch(
        feedbackAction.launch({
          loading: true,
        }),
      );

      const users = await axios.get(api.getAllMembers, {
        headers: {'x-auth-token': token},
      });

      dispatch(
        churchAction.setChurchData({
          members: users?.data?.data,
        }),
      );

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

  const handleSelect = (item) => {
    //check if the member has been added before
    if (selectedMembersIDs.includes(item._id)) {
      const newMember = selectedMembers.filter((v) => v.memberID !== item._id);
      const newMemberIDs = selectedMembersIDs.filter((v) => v !== item._id);

      dispatch(
        churchAction.setChurchData({
          selectedMembers: newMember,
          selectedMembersIDs: newMemberIDs,
        }),
      );

      return;
    }

    const set = {
      memberID: item._id,
      memberType: 'ADMIN',
    };

    const newMember = [...selectedMembers, set];
    const newMemberIDs = [...selectedMembersIDs, item._id];
    dispatch(
      churchAction.setChurchData({
        selectedMembers: newMember,
        selectedMembersIDs: newMemberIDs,
      }),
    );
  };

  const handleComplete = async () => {
    try {
      const users = await axios.post(
        `${api.joinRoom}/${room.roomID}`,
        selectedMembers,
        {
          headers: {userAuth: token},
        },
      );

      console.log('users', users);

      navigate('RoomChat');
    } catch (error) {
      console.log('error', error);
      console.log('error', error.response);
    }
  };

  return (
    <View style={classes.root}>
      <View style={classes.container}>
        <FlatList
          data={members}
          extraData={selectedMembersIDs}
          keyExtractor={(item, i) => i.toString()}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => handleSelect(item)}>
              <AddUser
                item={item}
                selected={selectedMembersIDs?.includes(item._id)}
              />
            </TouchableOpacity>
          )}
        />
      </View>

      <Surface style={classes.buttonRoot}>
        <Button label="ADD AS MODERATOR" onPress={handleComplete} />
      </Surface>
    </View>
  );
};
 
 export default AddModerator
 
const classes = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 20
  },
  buttonRoot: {
    position: "absolute",
    bottom: 0,
    height: 120,
    width: "100%",
    justifyContent: "center",
    paddingHorizontal: 20
  },
});