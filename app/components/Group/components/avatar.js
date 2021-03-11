import React from 'react'
import {View, StyleSheet} from 'react-native';
import {Avatar} from 'react-native-paper';

const img = 'https://secure.gravatar.com/avatar/633a831aae31c6e03393c6bab4681788?s=46&d=identicon';
const AvatarGroup = () => {
  return (
    <View style={classes.root}>
      <Avatar.Image
        source={{
          uri: img,
        }}
        size={30}
        style={classes.Avatar}
      />
      <Avatar.Image
        source={{
          uri: img,
        }}
        size={30}
        style={classes.Avatar}
      />
      <Avatar.Image
        source={{
          uri: img,
        }}
        style={classes.Avatar}
        size={30}
      />
    </View>
  );
}

export default AvatarGroup

const classes = StyleSheet.create({
  root: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10
  },
  Avatar: {
    marginLeft: -9,
    fontSize: 10
  },
});