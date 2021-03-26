import React from 'react';
import {View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import { Surface } from 'react-native-paper';
import { Button } from '../../../../components/Button';
import { AddUser } from '../../../../components/List';
import axios from 'axios';
import {api} from '../../../../api';
import {useSelector, useDispatch} from 'react-redux';
import {feedbackAction, accountAction} from '../../../../store/actions';


const AddModerator = () => {
  const dispatch = useDispatch();
  const {token, members, selectedMembers} = useSelector(({account}) => account);

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
        feedbackAction.launch({
          loading: false,
        }),
      );

      dispatch(
        accountAction.setAccountData({
          members: users?.data?.data,
        }),
      );
    } catch (error) {
      dispatch(
        feedbackAction.launch({
          loading: false,
        }),
      );
      console.log("error", error);
      console.log('error', error.response);
    }
  }

  const handleSelect = (item) => {

    const set = {
      memberID: item._id,
      memberType: 'ADMIN',
    };

    const newMember = [...selectedMembers, set];
    const newMemberIDs = [...selectedMembersIDs, item._id];
    dispatch(
      accountAction.setAccountData({
        selectedMembers: newMember,
        selectedMembersIDs: newMemberIDs,
      }),
    );
  }

  return (
    <View style={classes.root}>
      <View style={classes.container}>
        <FlatList
          data={members}
          keyExtractor={(item, i) => i.toString()}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => handleSelect(item)}>
              <AddUser item={item} />
            </TouchableOpacity>
          )}
        />
      </View>

      <Surface style={classes.buttonRoot}>
        <Button label="ADD AS MODERATOR" />
      </Surface>
    </View>
  );
}
 
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