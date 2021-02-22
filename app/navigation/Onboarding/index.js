import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {IconButton, Subheading} from 'react-native-paper';
import BackButton from "../custom/BackButton";
const Stack = createStackNavigator();

import Login from '../../screens/Onboarding';
import Register from '../../screens/Onboarding/register';
import Forgot from '../../screens/Onboarding/forgot';

const Navigation = () => {
  return (
    <Stack.Navigator initialRouteName="Login" headerMode="screen">
      <Stack.Screen
        name="Login"
        options={{headerShown: false}}
        component={Login}
      />
      <Stack.Screen
        name="Register"
        options={{headerShown: false}}
        component={Register}
      />
      <Stack.Screen
        name="Forgot"
        options={({route, navigation: {goBack}}) => ({
          headerLeft: () => <BackButton goBack={goBack} />,
          headerTitle: () => <Subheading>Forgot Password</Subheading>,
        })}
        component={Forgot}
      />
    </Stack.Navigator>
  );
};

export default Navigation;