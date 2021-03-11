import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, FlatList, Image } from "react-native";
import {
  Avatar,
  Caption,
  Divider,
  Subheading,
  Title,
} from 'react-native-paper';
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { UserList } from '../../../../components/List';

const link = 'https://secure.gravatar.com/avatar/633a831aae31c6e03393c6bab4681788?s=46&d=identicon';
const mapper = [link, link, link]
const RoomInfo = () => {
  return (
    <View style={classes.root}>
      <ScrollView>
        <View style={classes.headerRoot}>
          <Avatar.Image
            source={{
              uri: link,
            }}
            style={classes.logo}
          />
          <Title>Men’s Group</Title>
          <Icon name="pencil" size={20} color="grey" style={classes.icon} />
        </View>
        <Divider />
        <View style={classes.bodyRoot}>
          <Caption>Room Description</Caption>
          <Subheading>
            ut sem viverra aliquet eget sit amet tellus cras adipiscing enim eu
            turpis egestas pretium aenean pharetra magna ac placerat
          </Subheading>
        </View>
        <Divider />
        <View style={classes.typeRoot}>
          <Subheading style={classes.typeTitle}>Private Room</Subheading>
          <TouchableOpacity>
            <Caption style={classes.accordionSeeMore}>Change</Caption>
          </TouchableOpacity>
        </View>
        <Divider />
        <View style={classes.accordionRoot}>
          <View style={classes.accordionHeader}>
            <Subheading>Media</Subheading>
            <TouchableOpacity>
              <Caption style={classes.accordionSeeMore}>See All</Caption>
            </TouchableOpacity>
          </View>
          <FlatList
            data={mapper}
            horizontal={true}
            keyExtractor={(item, i) => i.toString()}
            renderItem={({item}) => (
              <View style={classes.mediaROot}>
                <Image
                  source={{
                    uri: item,
                  }}
                  style={classes.mediaImg}
                />
              </View>
            )}
          />
        </View>
        <Divider />
        <View style={classes.accordionRoot}>
          <View style={classes.accordionHeader}>
            <Subheading>Moderators</Subheading>
          </View>
          <FlatList
            data={mapper}
            keyExtractor={(item, i) => i.toString()}
            renderItem={({item}) => <UserList />}
          />
        </View>
        <Divider />
        <View style={classes.accordionRoot}>
          <View style={classes.accordionHeader}>
            <Subheading>Room Members</Subheading>
          </View>
          <FlatList
            data={mapper}
            keyExtractor={(item, i) => i.toString()}
            renderItem={({item}) => <UserList />}
          />
        </View>
        <Divider />
      </ScrollView>
    </View>
  );
}

export default RoomInfo

const classes = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  headerRoot: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    height: 100,
  },
  logo: {
    marginRight: 10,
  },
  icon: {
    marginHorizontal: 10,
  },
  bodyRoot: {
    marginHorizontal: 20,
    minHeight: 120,
    justifyContent: 'center',
  },
  typeRoot: {
    flexDirection: 'row',
    marginHorizontal: 20,
    height: 60,
    alignItems: 'center',
    justifyContent: "space-between"
  },
  typeTitle: {
    fontSize: 16,
    fontWeight: "600"
  },
  accordionRoot: {
    marginHorizontal: 20,
    paddingVertical: 10
  },
  accordionHeader: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 5,
  },
  accordionSeeMore: {
    color: '#47B5E7',
  },
  mediaImg: {
    width: 92,
    height: 92,
    borderRadius: 10,
  },
  mediaROot: {
    marginRight: 10,
    // marginVertical: 10,
  },
});