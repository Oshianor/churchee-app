import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Title, Subheading} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../../../theme';
import {ThemeContext} from '../../../context/ThemeContext';


const Church = ({_id, address, name, img, state, country, selected, onPress, disabled}) => {
  return (
    <ThemeContext.Consumer>
      {({theme, baseColor}) => (
        <TouchableOpacity
          onPress={() => onPress(_id)}
          disabled={disabled}
          style={[classes.root, selected === _id && classes.selected]}>
          <Title style={classes.title}>{name}</Title>
          <View style={classes.detailsRoot}>
            <Icon name="map-marker" style={classes.detailsIcon} size={15} />
            <Subheading
              style={[
                classes.detailsText,
                {color: theme.mode ? '#fff' : '#101424'},
              ]}>
              {address}
            </Subheading>
          </View>
          <View style={classes.detailsRoot}>
            <Icon name="account" style={classes.detailsIcon} size={15} />
            <Subheading
              style={[
                classes.detailsText,
                {color: theme.mode ? '#fff' : '#101424'},
              ]}>
              {`${state} ${country}`}
            </Subheading>
          </View>
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
  root: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#DADADA',
    height: 100,
    paddingHorizontal: 10,
    justifyContent: 'space-around',
    marginVertical: 5,
  },
  title: {
    fontWeight: '700',
    fontSize: 18
  },
  detailsRoot: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  detailsIcon: {
    color: colors.secondary.main,
    marginRight: 5,
  },
  detailsText: {
    color: '#101424',
    fontSize: 15,
    fontWeight: '300',
  },
  selected: {
    borderColor: colors.red,
  },
  img: {
    height: 45,
    width: 45,
  },
  imgRoot: {
    justifyContent: "center",
    alignItems: "center"
  },
});
