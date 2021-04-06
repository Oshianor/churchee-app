import React from 'react';
import { Surface, Subheading } from "react-native-paper"
import {StyleSheet, Modal, TouchableOpacity, View} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { feedbackAction } from '../../../store/actions';
import { colors } from '../../../theme';
import {Button} from '../../Button';


const FeedBack = () => {
  const {open, msg, severity} = useSelector(({feedback}) => feedback);
  const dispatch = useDispatch();
  return (
    <Modal animationType="slide" transparent={true} visible={open}>
      <View style={[classes.container, {backgroundColor: 'rgba(0,0,0,0.1)'}]}>
        <Surface style={classes.surface}>
          <Subheading style={classes.message}>{msg}</Subheading>

          <View style={classes.buttonRoot}>
            <TouchableOpacity
              style={classes.button}
              onPress={() => dispatch(feedbackAction.dismiss())}>
              <Subheading style={classes.dontCancel}>OK</Subheading>
            </TouchableOpacity>
          </View>
        </Surface>
      </View>
    </Modal>
  );
};

export default FeedBack;

const classes = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  surface: {
    position: 'absolute',
    width: '100%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dontCancel: {
    color: colors.primary.main,
    fontSize: 20,
    paddingVertical: 5,
    fontWeight: '700',
  },
  message: {
    marginVertical: 20,
    marginHorizontal: 20,
    fontSize: 17,
    fontWeight: '400',
  },
  buttonRoot: {
    borderTopWidth: 1,
    borderTopColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  button: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});