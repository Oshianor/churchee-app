import React from 'react'
import { View, StyleSheet } from 'react-native';
import { Avatar, Subheading } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const link = 'https://secure.gravatar.com/avatar/633a831aae31c6e03393c6bab4681788?s=46&d=identicon';
const User = () => {
  return (
    <View style={classes.root}>
      <View style={classes.left}>
        <Avatar.Image source={{uri: link}} size={30} />
        <Subheading style={classes.text}>Phoenix Walker</Subheading>
      </View>
      <Icon name="dots-vertical" size={25} color="grey" />
    </View>
  );
}

export default User

const classes = StyleSheet.create({
  root: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginVertical: 5,
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
