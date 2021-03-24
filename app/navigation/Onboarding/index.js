import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {IconButton, Subheading} from 'react-native-paper';
import BackButton from "../custom/BackButton";
import {useSelector} from 'react-redux';
const Stack = createStackNavigator();

import Login from '../../screens/Onboarding';
import Register from '../../screens/Onboarding/register';
import Forgot from '../../screens/Onboarding/forgot';
import FindChurch from '../../screens/Onboarding/findChurch';

const Navigation = () => {
  const {church} = useSelector(({account}) => account);

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
      <Stack.Screen
        name="FindChurch"
        options={({route, navigation: {goBack}}) => ({
          headerLeft: () => (church ? <BackButton goBack={goBack} /> : null),
          headerTitle: () => <Subheading>Join a congregation</Subheading>,
        })}
        component={FindChurch}
      />
    </Stack.Navigator>
  );
};

export default Navigation;