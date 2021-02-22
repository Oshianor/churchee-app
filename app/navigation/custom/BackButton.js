import React from 'react' 
import {TouchableOpacity, StyleSheet} from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { colors } from '../../theme';

const BackButton = ({goBack, color}) => {
    return (
      <TouchableOpacity
        style={classes.root}
        disabled={!goBack}
        onPress={() => goBack()}>
        <Icon
          name="chevron-left"
          size={30}
          color={color}
        />
      </TouchableOpacity>
    );
    
};

BackButton.defaultProps = {
  color: colors.black,
};

export default BackButton



const classes = StyleSheet.create({
  root: {
    marginLeft: 20,
  },
  img: {
    height: 15,
    width: 9,
  },
});