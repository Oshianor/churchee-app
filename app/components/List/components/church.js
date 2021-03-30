import React from 'react'
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {ThemeContext} from '../../../context/ThemeContext';
import {Caption, Title} from 'react-native-paper';
import {colors} from '../../../theme';
import {api} from '../../../api';


const Church = ({ item }) => {
  return (
    <ThemeContext.Consumer>
      {({theme, baseColor}) => (
        <View style={classes.root}>
          <View style={classes.imgRoot}>
            <Image source={{uri: api.img + item.img}} style={classes.img} />
          </View>
          <View style={classes.left}>
            <Title style={classes.title}>{item.name}</Title>
            <Caption
              style={[
                classes.detailLocation,
                {color: theme.mode ? '#fff' : colors.black},
              ]}>
              {`${item.state}, ${item.country}`}
            </Caption>
            <View style={classes.detailsRoot}>
              <Caption
                style={[
                  classes.detailsText,
                  {color: theme.mode ? '#fff' : '#101424'},
                ]}>
                {item.bio}
              </Caption>
            </View>
          </View>
        </View>
      )}
    </ThemeContext.Consumer>
  );
}

export default Church;

const classes = StyleSheet.create({
  root: {
    // justifyContent: 'space-between',
    flexDirection: 'row',
    paddingVertical: 5,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#E4E4E4',
    paddingHorizontal: 20,
  },
  left: {
    justifyContent: 'space-between',
    // flexDirection: 'row',
  },
  text: {
    marginLeft: 10,
    fontWeight: '400'
  },
  img: {
    height: 50,
    width: 50,
    borderRadius: 40,
  },
  imgRoot: {
    // justifyContent: 'flex-start',
    marginRight: 10
  },
  title: {
    fontWeight: '500',
    fontSize: 17,
    lineHeight: 20,
  },
  detailsRoot: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  detailsIcon: {
    color: colors.secondary.main,
    marginRight: 5,
  },
  detailLocation: {
    fontSize: 11,
    lineHeight: 10,
    fontWeight: '400',
  },
  detailsText: {
    // color: '#101424',
    fontSize: 12,
    fontWeight: '300'
  }
});
