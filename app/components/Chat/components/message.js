import React from 'react';
import { StyleSheet, View } from "react-native"
import { Avatar, Caption, Subheading } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const link =
  'https://secure.gravatar.com/avatar/633a831aae31c6e03393c6bab4681788?s=46&d=identicon';

const msgStatus = {
  SENT: () => {
    return <Caption style={classes.dot}>.</Caption>;
  },
  DELIVERED: () => {
    return <Icon name="check" size={20} />;
  },
  READ: () => {
    return <Icon name="check-all" size={20} />;
  },
};

const Message = ({ item }) => {
  console.log('item.messageStatus', item.messageStatus);
  return (
    <View style={classes.root}>
      <View style={classes.avater}>
        <Avatar.Image source={{uri: link}} size={36} />
      </View>
      <View style={classes.content}>
        <View style={classes.header}>
          <Caption>Tonia Harvey</Caption>
          <View style={classes.dateMark}>
            {item.messageStatus === 'READ' && <Icon name="check-all" size={20} color="green" />}
            {item.messageStatus === 'SENT' && <Icon name="check" size={20} />}
            {item.messageStatus === 'DELIVERED' && (
              <Icon name="check-all" size={20} />
            )}            
            <Caption style={classes.dot}>.</Caption>
            <Caption style={classes.time}>8:21 AM</Caption>
          </View>
        </View>
        <View style={classes.textRoot}>
          <Subheading style={classes.textContent}>
            {item.messageContent}
          </Subheading>
        </View>
      </View>
    </View>
  );
}

export default Message

const classes = StyleSheet.create({
  root: {
    // paddingHorizontal: 10,
    marginHorizontal: 10,
    marginVertical: 10,
    // justifyContent: 'center',
    // justifyContent: '',
    // alignItems: "center",
    flexDirection: 'row',
    // width: '100%',
  },
  avater: {
    // width: '10%',
  },
  content: {
    marginLeft: 10,
    flex: 1
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // width: '100%',
    // width: '80%',
  },
  dateMark: {
    flexDirection: 'row',
    // justifyContent: 'flex-end',
    // alignItems: 'center',
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