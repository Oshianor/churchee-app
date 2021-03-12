import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import { Surface } from 'react-native-paper';
import { Button } from '../../../../components/Button';
import { AddUser } from '../../../../components/List';

const link =
  'https://secure.gravatar.com/avatar/633a831aae31c6e03393c6bab4681788?s=46&d=identicon';
const mapper = [
  link,
  link,
  link
];
const AddModerator = () => {
  return (
    <View style={classes.root}>
      <View style={classes.container}>
        <FlatList
          data={mapper}
          keyExtractor={(item, i) => i.toString()}
          renderItem={({item}) => <AddUser />}
        />
      </View>

      <Surface style={classes.buttonRoot}>
        <Button label="ADD AS MODERATOR" />
      </Surface>
    </View>
  );
}
 
 export default AddModerator
 
const classes = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 20
  },
  buttonRoot: {
    position: "absolute",
    bottom: 0,
    height: 120,
    width: "100%",
    justifyContent: "center",
    paddingHorizontal: 20
  },
});