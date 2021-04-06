import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Avatar, Subheading, Surface} from 'react-native-paper';
import { api } from '../../../api';
import { dimension } from '../../../theme';
import { AvatarGroup } from "../../Group"


const Room = ({ onPress, name, img }) => {
  return (
    <TouchableOpacity style={classes.container} onPress={onPress}>
      <Surface style={classes.root}>
        <Avatar.Image
          source={{
            uri:
              `${api.img}${img}`
          }}
        />

        <Subheading>{name}</Subheading>
        <AvatarGroup />
      </Surface>
    </TouchableOpacity>
  );
}

export default Room

const classes = StyleSheet.create({
  container: {
    marginVertical: 10
  },
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
    marginVertical: 5,
  },
});