import React from 'react'
import {createStackNavigator} from '@react-navigation/stack';
import { Subheading} from 'react-native-paper';
import BackButton from '../../../custom/BackButton';
import PPRScreen from '../../../../screens/Dashboard/More/PPR';
import AddPPRScreen from '../../../../screens/Dashboard/More/PPR/AddPPRScreen';
import ViewPPRScreen from '../../../../screens/Dashboard/More/PPR/ViewPPRScreen';
const Stack = createStackNavigator();


const PersonalPrayerRequests = () => {
  return (
    <Stack.Navigator initialRouteName="PPRScreen">
      <Stack.Screen
        name="PPRScreen"
        options={({ navigation: {goBack}}) => ({
          headerLeft: () => <BackButton onPress={goBack} />,
          headerTitle: () => <Subheading>Prayer Request</Subheading>,
        })}
        component={PPRScreen}
      />
      <Stack.Screen
        name="AddPPRScreen"
        options={({ navigation: {goBack}}) => ({
          headerLeft: () => <BackButton onPress={goBack} />,
          headerTitle: () => <Subheading>Personal Prayer Request</Subheading>,
        })}
        component={AddPPRScreen}
      />
      <Stack.Screen
        name="ViewPPRScreen"
        options={({ navigation: {goBack}}) => ({
          headerLeft: () => <BackButton onPress={goBack} />,
          headerTitle: () => <Subheading>Personal Prayer Request</Subheading>,
        })}
        component={ViewPPRScreen}
      />
    </Stack.Navigator>
  );
};

export default PersonalPrayerRequests;