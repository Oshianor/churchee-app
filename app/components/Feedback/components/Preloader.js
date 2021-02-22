import React from 'react';
import { Modal, StyleSheet, View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {colors} from '../../../theme';
import { Button } from '../../Button';
import {useSelector, useDispatch} from 'react-redux';
import {feedbackAction} from '../../../store/actions';

const Preloader = () => {
  const {loading, onRequestClose, failed, retryAction} = useSelector(({feedback}) => feedback);
  return (
    <Modal
      visible={loading}
      onRequestClose={onRequestClose}
      animationType="slide"
      transparent>
      <View style={styles.modal}>
        {!failed ? (
          <ActivityIndicator size="large" color={colors.primary.main} />
        ) : (
          <Button label="Reload" onPress={retryAction} />
        )}
      </View>
    </Modal>
  );
};


export default Preloader;

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    flex: 1,
    backgroundColor: '#00000080',
  },
});