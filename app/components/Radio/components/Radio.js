import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../../../theme';
import {ThemeContext} from '../../../context/ThemeContext';

const Radio = ({selected, container, selectedStyle}) => {
  return (
    <ThemeContext.Consumer>
      {({theme, baseColor}) => (
        <View style={[classes.radioRoot, container]}>
          {selected && (
            <View
              style={[
                classes.radioSelected,
                selectedStyle,
                {backgroundColor: baseColor},
              ]}>
              <Icon name="check" size={15} color="white" />
            </View>
          )}
        </View>
      )}
    </ThemeContext.Consumer>
  );
};

Radio.defaultProps = {
  selected: false,
};

export default Radio;

const classes = StyleSheet.create({
  radioRoot: {
    width: 25,
    height: 25,
    borderRadius: 40,
    borderWidth: .5,
    borderColor: colors.secondary.main,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioSelected: {
    width: 20,
    height: 20,
    // backgroundColor: colors.primary.main,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center"
  },
});
