import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Subheading, Surface} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { dimension } from '../../../theme';


const CreateRoom = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <Surface style={classes.root}>
        <View style={classes.iconRoot}>
          <Icon name="plus" size={30} color="#566482" />
        </View>

        <Subheading>Create New</Subheading>
      </Surface>
    </TouchableOpacity>
  );
};

export default CreateRoom

const classes = StyleSheet.create({
  root: {
    width: dimension.APP_WIDTH / 2.4,
    height: dimension.APP_HEIGHT / 4.5,
    elevation: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
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