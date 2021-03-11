import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Avatar, Subheading, Surface} from 'react-native-paper';
import { dimension } from '../../../theme';
import { AvatarGroup } from "../../Group"


const Room = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <Surface style={classes.root}>
        <Avatar.Image
          source={{
            uri:
              'https://secure.gravatar.com/avatar/633a831aae31c6e03393c6bab4681788?s=46&d=identicon',
          }}
        />

        <Subheading>Choir Room</Subheading>
        <AvatarGroup />
      </Surface>
    </TouchableOpacity>
  );
}

export default Room

const classes = StyleSheet.create({
  root: {
    width: dimension.APP_WIDTH / 2.4,
    height: dimension.APP_HEIGHT / 4.5,
    elevation: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconRoot: {
    height: 60,
    width: 60,
    borderRadius: 60,
    backgroundColor: '#EFF1F2',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5
  },
});