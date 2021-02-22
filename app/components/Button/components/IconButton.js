import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {colors} from '../../../theme';
import {Subheading, Caption} from 'react-native-paper';

const IconButton = ({
  icon,
  label,
  endIcon,
  onPress,
  labelStyle,
  containerStyle,
  caption,
  captionStyle,
  endPress,
  disabled,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[classes.container, containerStyle]}
      onPress={onPress}>
      <View style={classes.nameRoot}>
        <View style={classes.nameBody}>
          {icon}
          <Subheading style={[classes.name, labelStyle]}>{label}</Subheading>
        </View>
        {endIcon && (
          <TouchableOpacity onPress={endPress}>
            <Subheading style={classes.endIcon}>{endIcon}</Subheading>
          </TouchableOpacity>
        )}
      </View>
      {caption && (
        <Caption style={[classes.caption, captionStyle]}>
          {endIcon && caption ? `${caption}` : caption}
        </Caption>
      )}
    </TouchableOpacity>
  );
};

IconButton.defaultProps = {
  remove: false,
  disabled: false,
  caption: null,
};

export default IconButton;

const classes = StyleSheet.create({
  container: {
    minHeight: 55,
    backgroundColor: colors.primary.light,
    width: '100%',
    // alignItems: 'center',
    flexDirection: 'column',
    borderRadius: 5,
    marginVertical: 10,
    paddingHorizontal: 10,
    justifyContent: 'center',
    paddingVertical: 10
  },
  name: {
    marginHorizontal: 10,
    color: colors.black,
    fontWeight: '700',
    fontSize: 15,
  },
  endIcon: {
    marginHorizontal: 10,
    color: colors.intermediate.dark,
    textTransform: "capitalize"
  },
  nameRoot: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  nameBody: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // width: '100%',
  },
  buttonRoot: {
    flex: 2,
    alignItems: 'baseline',
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  labelStyle: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 17,
  },
  caption: {
    fontSize: 10,
    lineHeight: 10,
    marginLeft: 10,
    // textAlign: "left",
  },
});
