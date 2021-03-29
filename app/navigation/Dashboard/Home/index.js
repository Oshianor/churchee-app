import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Subheading} from 'react-native-paper';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import Home from '../../../screens/Dashboard';
import {useSelector} from 'react-redux';
import {ThemeContext} from '../../../context/ThemeContext';
import { colors } from '../../../theme';
import BackButton from '../../custom/BackButton';
const Stack = createStackNavigator();


const Navigation = () => {
  const {church} = useSelector(({church}) => church);
  return (
    <ThemeContext.Consumer>
      {({theme, baseColor}) => (
        <Stack.Navigator initialRouteName="Login" headerMode="screen">
          <Stack.Screen
            name="Home"
            options={({route, navigation: {openDrawer}}) => ({
              headerLeft: () => (
                <TouchableOpacity
                  style={classes.menu}
                  onPress={() => openDrawer()}>
                  <Icon
                    name="menu"
                    size={30}
                    color={theme.mode ? colors.white : colors.black}
                  />
                </TouchableOpacity>
              ),
              headerTitle: () => (
                <Subheading
                  style={classes.header}>{`${church?.name}`}</Subheading>
              ),
            })}
            component={Home}
          />
          
        </Stack.Navigator>
      )}
    </ThemeContext.Consumer>
  );
};

export default Navigation;

const classes = StyleSheet.create({
  menu: {
    marginLeft: 20,
  },
  header: {
    fontSize: 18, fontWeight: "700"
  },
});
