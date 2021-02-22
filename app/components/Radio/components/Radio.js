import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../../../theme';

const Radio = ({selected, container, selectedStyle}) => {
  return (
    <View style={[classes.radioRoot, container]}>
      {selected && <View style={[classes.radioSelected, selectedStyle]}>
        <Icon name="check" size={15} color="white" />
      </View> }
    </View>
  );
};

Radio.defaultProps = {
  selected: false,
};

export default Radio;

const classes = StyleSheet.create({
  radioRoot: {
    width: 35,
    height: 35,
    borderRadius: 40,
    borderWidth: .5,
    borderColor: colors.secondary.main,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioSelected: {
    width: 20,
    height: 20,
    backgroundColor: colors.primary.main,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center"
  },
});
