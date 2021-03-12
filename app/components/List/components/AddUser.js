import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar, Subheading } from 'react-native-paper';
import { Radio } from "../../Radio"

const link = 'https://source.unsplash.com/random/75x75';
const User = () => {
  return (
    <TouchableOpacity style={classes.root}>
      <View style={classes.left}>
        <Avatar.Image source={{uri: link}} size={30} />
        <Subheading style={classes.text}>Phoenix Walker</Subheading>
      </View>
      <Radio selected />
    </TouchableOpacity>
  );
}

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
