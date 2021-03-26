import React from 'react'
import { View, StyleSheet } from 'react-native';
import { Avatar, Subheading } from 'react-native-paper';
import { api } from '../../../api';
import { Radio } from "../../Radio"

// const link = 'https://source.unsplash.com/random/75x75';
const User = ({item, selected}) => {
  return (
    <View style={classes.root}>
      <View style={classes.left}>
        <Avatar.Image source={{uri: api.img + item.img}} size={30} />
        <Subheading style={classes.text}>{item.name}</Subheading>
      </View>
      <Radio selected />
    </View>
  );
};

export default User

const classes = StyleSheet.create({
  root: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: "center"
  },
  left: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  text: {
    marginLeft: 10,
    fontWeight: "400"
  },
});
