import React from 'react';
import { StyleSheet, View } from "react-native"
import { Avatar, Caption, Subheading } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const link =
  'https://secure.gravatar.com/avatar/633a831aae31c6e03393c6bab4681788?s=46&d=identicon';

const Message = () => {
  return (
    <View style={classes.root}>
      <View style={classes.avater}>
        <Avatar.Image source={{uri: link}} size={36} />
      </View>
      <View style={classes.content}>
        <View style={classes.header}>
          <Caption>Tonia Harvey</Caption>
          <View style={classes.dateMark}>
            <Icon name="check-all" size={20} />
            <Caption style={classes.dot}>.</Caption>
            <Caption style={classes.content}>8:21 AM</Caption>
          </View>
        </View>
        <View style={classes.textRoot}>
          <Subheading style={classes.textContent}>
            Hi Kathy, This much is clear: governments that protect these rights
            are ultimately
          </Subheading>
        </View>
        <View>

        </View>
      </View>
    </View>
  );
}

export default Message

const classes = StyleSheet.create({
  root: {
    paddingHorizontal: 10,
    marginHorizontal: 20,
    marginVertical: 10,
    justifyContent: 'center',
    // alignItems: "center",
    flexDirection: 'row',
    // width: "100%"
  },
  avater: {},
  content: {
    marginLeft: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateMark: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    fontSize: 30,
    marginHorizontal: 5,
  },
  textContent: {
    // flexWrap: 'wrap',
    fontSize: 14,
  },
  textRoot: {
    // flex: 1,
  },
});