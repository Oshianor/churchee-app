import React from 'react'
import {createStackNavigator} from '@react-navigation/stack';
import { Subheading} from 'react-native-paper';
import BackButton from '../../../custom/BackButton';
import PPRScreen from '../../../../screens/Dashboard/More/PPR';
const Stack = createStackNavigator();


const PersonalPrayerRequests = () => {
  return (
    <Stack.Navigator initialRouteName="PPRScreen">
      <Stack.Screen
        name="PPRScreen"
        options={({navigation: {goBack}}) => ({
          headerLeft: () => <BackButton goBack={goBack} />,
          headerTitle: () => <Subheading>Prayer Request</Subheading>,
        })}
        component={PPRScreen}
      />
    </Stack.Navigator>
  );
};

export default PersonalPrayerRequests;