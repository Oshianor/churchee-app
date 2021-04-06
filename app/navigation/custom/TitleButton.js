import React from 'react';
import {View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import { Subheading, Title } from 'react-native-paper';
import { colors } from '../../theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ThemeContext} from '../../context/ThemeContext';


const TitleButton = ({navigate = null, label, labelStyle, rootStyle}) => {
  return navigate ? (
    <ThemeContext.Consumer>
      {({theme}) => (
        <TouchableOpacity
          style={[classes.root, rootStyle]}
          onPress={() => navigate()}>
          <Icon
            name="chevron-left"
            size={20}
            color={theme.mode ? colors.white : colors.black}
          />
          <Title style={classes.label}>{label}</Title>
        </TouchableOpacity>
      )}
    </ThemeContext.Consumer>
  ) : (
    <Subheading style={[classes.label, labelStyle]}>{label}</Subheading>
  );
};

export default TitleButton;

const classes = StyleSheet.create({
  root: {
    marginLeft: 20,
    flexDirection: "row",
    alignItems: "center"
  },
  label: {
    fontSize: 18,
    lineHeight: 22,
    fontWeight: "700",
  },
});
