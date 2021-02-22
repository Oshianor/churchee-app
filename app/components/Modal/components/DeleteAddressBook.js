import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import { Surface, Subheading } from "react-native-paper"
import { Button } from '../../Button';
import { colors } from '../../../theme';
import { addressBookAction, feedbackAction } from '../../../store/actions';
import axios from "axios";
import { api } from '../../../api';
import { useNavigation } from '@react-navigation/native';

const DeleteAddressBook = () => {
  const dispatch = useDispatch();
  const { navigate } = useNavigation();
  const [loading, setLoading] = React.useState(false)
  const {deleted, selected} = useSelector(({addressBook}) => addressBook);
  const {token} = useSelector(({account}) => account);

  const handleDelete = async () => {
    try {

      setLoading(true);
      const address = await axios.delete(`${api.address}/${selected._id}`, {
        headers: {'x-auth-token': token},
      });
      getHistory();
      setLoading(false);

      dispatch(
        feedbackAction.launch({
          open: true,
          severity: 's',
          msg: address.data.msg,
        }),
      );
      dispatch(addressBookAction.setAddressBook({deleted: false}));
      navigate("AddressBook");
    } catch (error) {
      setLoading(false);
      dispatch(addressBookAction.setAddressBook({deleted: false}));
      console.log("error", error);
      console.log('error', error.response);
      dispatch(
        feedbackAction.launch({
          open: true,
          severity: 'w',
          msg: error.response.data.msg,
        }),
      );

    }
  }


  const getHistory = async () => {
    try {
      const hist = await axios.get(api.address, {
        headers: {'x-auth-token': token},
      });

      console.log('hist', hist);

      dispatch(addressBookAction.setAddressBook({data: hist.data.data}));
    } catch (error) {
      console.log('error', error);
      console.log('error', error.reponse);
      setLoading(false);
    }
  };


  return (
    <Modal animationType="slide" transparent={true} visible={deleted}>
      <View style={[classes.container, {backgroundColor: 'rgba(0,0,0,0.5)'}]}>
        <Surface style={classes.surface}>
          <Subheading style={classes.message}>
            Do you want to delete this Address Book
          </Subheading>

          <Button
            label="Yes, Please"
            loading={loading}
            rootStyle={classes.cancel}
            onPress={handleDelete}
          />

          <TouchableOpacity
            onPress={() =>
              dispatch(addressBookAction.setAddressBook({deleted: false}))
            }>
            <Subheading style={classes.dontCancel}>No, don’t Delete</Subheading>
          </TouchableOpacity>
        </Surface>
      </View>
    </Modal>
  );
}

export default DeleteAddressBook;


const classes = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  surface: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 20,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dontCancel: {
    color: colors.primary.main,
    marginBottom: 30,
    marginTop: 10,
  },
  cancel: {
    marginVertical: 10,
  },
  message: {
    marginVertical: 10,
  },
});