import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();

import Home from '../../../screens/Dashboard';

const Navigation = () => {
  return (
    <Stack.Navigator initialRouteName="Login" headerMode="screen">
      <Stack.Screen
        name="Home"
        options={{headerShown: false}}
        component={Home}
      />
    </Stack.Navigator>
  );
};

export default Navigation;