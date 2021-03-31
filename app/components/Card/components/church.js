import React from 'react';
import {StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import {Title, Subheading, Avatar, Surface, Caption} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../../../theme';
import {ThemeContext} from '../../../context/ThemeContext';
import { api } from '../../../api';


// const link = "1616779706978_05015fee231064313879e8b5a5e4b2c7.png";
const Church = ({item,  selected, onPress, disabled}) => {
  return (
    <ThemeContext.Consumer>
      {({theme, baseColor}) => (
        <TouchableOpacity
          onPress={() => onPress()}
          disabled={disabled}
          style={[
            classes.contained,
            // selected === _id && classes.selected
          ]}>
          <Surface
            style={[
              classes.root,
              {backgroundColor: !theme.mode ? '#F5F5F5' : colors.black},
            ]}>
            <View style={classes.imgRoot}>
              <Image source={{uri: api.img + item.img}} style={classes.img} />
            </View>
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
                {`${item.bio}`}
              </Caption>
            </View>
          </Surface>
        </TouchableOpacity>
      )}
    </ThemeContext.Consumer>
  );
};

Church.defaultProps = {
  disabled: false,
};

export default Church;

const classes = StyleSheet.create({
  contained: {
    width: 155,
    // minHeight: 250,
    marginRight: 10,
    marginVertical: 5,
  },
  root: {
    borderRadius: 10,
    
    // height: 200,
    paddingHorizontal: 10,
    // justifyContent: 'space-around',
    width: 155,
    elevation: 0,
  },
  title: {
    fontWeight: '500',
    fontSize: 17,
    lineHeight: 20,
    marginTop: 10,
    marginBottom: 5
  },
  detailsRoot: {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 10
  },
  detailsIcon: {
    color: colors.secondary.main,
    marginRight: 5,
  },
  detailLocation: {
    fontSize: 10,
    lineHeight: 10,
    fontWeight: '400',
  },
  detailsText: {
    // color: '#101424',
    fontSize: 12,
    fontWeight: '300',
  },
  selected: {
    borderColor: colors.red,
  },
  img: {
    height: 45,
    width: 45,
    borderRadius: 40,
  },
  imgRoot: {
    justifyContent: 'flex-start',
    
    marginVertical: 10
  },
});
