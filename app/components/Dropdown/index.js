import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {Subheading} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ThemeContext} from '../../context/ThemeContext';


const Dropdown = (props) => {
  return (
    <ThemeContext.Consumer>
      {({theme, baseColor}) => (
        <View style={[classes.root, props.rootStyle]}>
          <View
            style={[
              classes.labelRoot,
              props.labelRoot,
              {backgroundColor: !theme.mode ? '#fff' : '#000'},
            ]}>
            <Subheading style={classes.label}>{props.label}</Subheading>
          </View>
          <View style={[classes.container, props.rootStyle]}>
            <RNPickerSelect
              {...props}
              style={{
                viewContainer: {
                  alignContent: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  ...props.viewContainer,
                },
                inputIOS: {
                  fontSize: 16,
                  paddingVertical: 12,
                  paddingHorizontal: 10,
                  color: theme.mode ? '#fff' : '#000',
                  paddingRight: 30,
                },
                inputAndroid: {
                  fontSize: 16,
                  paddingHorizontal: 10,
                  paddingVertical: 8,
                  width: 600,
                  color: theme.mode ? '#fff' : '#000',
                  paddingRight: 30,
                },
              }}
              Icon={() => {
                return (
                  <View style={classes.iconRoot}>
                    <Icon name="menu-down" size={25} style={classes.icon} />
                  </View>
                );
              }}
            />
          </View>
        </View>
      )}
    </ThemeContext.Consumer>
  );
};


export default Dropdown;

const classes = StyleSheet.create({
  root: {
    // width: '100%',
    marginVertical: 5,
  },
  labelRoot: {
    marginBottom: -12,
    backgroundColor: 'white',
    zIndex: 1,
    width: 70,
  },
  label: {
    fontSize: 14,
    padding: 0,
    margin: 0,
    fontWeight: '500',
  },
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    borderColor: '#D9D9D9',
    borderWidth: 1,
    borderRadius: 5,
    height: 48,
  },
  iconRoot: {
    alignContent: 'center',
    justifyContent: 'center',
    // width: '100%',
    flex: 0.1,
    marginHorizontal: 5,
    marginTop: 10,
  },
  icon: {
    opacity: 0.39,
  },
});

const pickerSelectStyles = StyleSheet.create({
  viewContainer: {
    // width: '100%',
    alignContent: 'center',
    justifyContent: 'center',
    // flex: 0.9
  },
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    // width: 300,
    // width: '100%',
    // borderWidth: 1,
    // borderColor: 'red',
    // borderRadius: 4,
    color: '#2AC940',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    // width: 300,
    // borderWidth: 0.5,
    // borderColor: '#D9D9D9',
    // flex: 0.9,
    // borderRadius: 8,
    color: '#2AC940',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
