import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Subheading} from 'react-native-paper';
import BackButton from "../custom/BackButton";
import {useSelector} from 'react-redux';
const Stack = createStackNavigator();

import Login from '../../screens/Onboarding';
import Register from '../../screens/Onboarding/register';
import Forgot from '../../screens/Onboarding/forgot';
import FindChurch from '../../screens/Onboarding/findChurch';
import SearchChurch from "../../screens/Onboarding/searchChurch"
import CountryList from "../../screens/Onboarding/countryList"
import StateList from '../../screens/Onboarding/stateList';


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
        options={{headerShown: false}}
        component={FindChurch}
      />
      <Stack.Screen
        name="SearchChurch"
        options={({route, navigation: {goBack}}) => ({
          headerLeft: () => <BackButton goBack={goBack} />,
          headerTitle: () => <Subheading>Find Church</Subheading>,
        })}
        component={SearchChurch}
      />

      <Stack.Screen
        name="CountryList"
        options={({route, navigation: {goBack}}) => ({
          headerLeft: () => <BackButton goBack={goBack} />,
          headerTitle: () => <Subheading>Filter By Country</Subheading>,
        })}
        component={CountryList}
      />
      <Stack.Screen
        name="StateList"
        options={({route, navigation: {goBack}}) => ({
          headerLeft: () => <BackButton goBack={goBack} />,
          headerTitle: () => <Subheading>Find Church</Subheading>,
        })}
        component={StateList}
      />
    </Stack.Navigator>
  );
};

export default Navigation;