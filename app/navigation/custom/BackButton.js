import React from 'react' 
import {TouchableOpacity, StyleSheet} from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { colors } from '../../theme';
import {ThemeContext} from '../../context/ThemeContext';


const BackButton = ({goBack}) => {
  return (
    <ThemeContext.Consumer>
      {({theme, baseColor}) => (
        <TouchableOpacity
          style={classes.root}
          disabled={!goBack}
          onPress={() => goBack()}>
          <Icon
            name="chevron-left"
            size={30}
            color={theme.mode ? colors.white : colors.black}
          />
        </TouchableOpacity>
      )}
    </ThemeContext.Consumer>
  );
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