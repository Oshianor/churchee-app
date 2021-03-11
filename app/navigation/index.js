import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Subheading} from 'react-native-paper';
import BackButton from './custom/BackButton';
import Onboarding from './Onboarding';
import Dashboard from './Dashboard';
import Setting from "../screens/Dashboard/More/Setting"
import Devotion from "./Dashboard/More/Devotion";
import Sermon from './Dashboard/More/Sermon';
import Hymn from './Dashboard/More/Hymn';
import Forms from './Dashboard/More/Forms';
import Media from './Dashboard/More/Media';
import PrayerRequest from './Dashboard/More/PrayerRequest';
import PPR from './Dashboard/More/PPR';
import Profile from "./Dashboard/Profile";
import Chat from "./Dashboard/More/Chat"
import FindChurch from "../screens/Onboarding/findChurch"
const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <Stack.Navigator initialRouteName="Dashboard" headerMode="screen">
      <Stack.Screen
        name="Onboarding"
        options={{headerShown: false}}
        component={Onboarding}
      />
      <Stack.Screen
        name="FindChurch"
        options={({route, navigation: {goBack}}) => ({
          headerLeft: () => <BackButton goBack={goBack} />,
          headerTitle: () => <Subheading>Join a congregation</Subheading>,
        })}
        component={FindChurch}
      />
      <Stack.Screen
        name="Dashboard"
        options={{headerShown: false}}
        component={Dashboard}
      />
      <Stack.Screen
        name="Devotion"
        options={{headerShown: false}}
        component={Devotion}
      />
      <Stack.Screen
        name="Sermon"
        options={{headerShown: false}}
        component={Sermon}
      />
      <Stack.Screen
        name="Hymn"
        options={{headerShown: false}}
        component={Hymn}
      />
      <Stack.Screen
        name="Form"
        options={{headerShown: false}}
        component={Forms}
      />
      <Stack.Screen
        name="Media"
        options={{headerShown: false}}
        component={Media}
      />
      <Stack.Screen
        name="PrayerRequest"
        options={{headerShown: false}}
        component={PrayerRequest}
      />
      <Stack.Screen name="PPR" options={{headerShown: false}} component={PPR} />
      <Stack.Screen
        name="SettingScreen"
        options={({route, navigation: {goBack}}) => ({
          headerLeft: () => <BackButton goBack={goBack} />,
          headerTitle: () => <Subheading>Setting</Subheading>,
        })}
        component={Setting}
      />
      <Stack.Screen
        name="Profile"
        options={{headerShown: false}}
        component={Profile}
      />

      <Stack.Screen
        name="Chat"
        options={{headerShown: false}}
        component={Chat}
      />
    </Stack.Navigator>
  );
};

export default Navigation;
