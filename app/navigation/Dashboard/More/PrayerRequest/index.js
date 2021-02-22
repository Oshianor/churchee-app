import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Subheading} from 'react-native-paper';
import PrayerRequest from '../../../../screens/Dashboard/More/PrayerRequest';
import ViewPrayerRequest from '../../../../screens/Dashboard/More/PrayerRequest/ViewPrayerRequest';
import BackButton from "../../../custom/BackButton"
const Stack = createStackNavigator();


const PrayRequests = () => {
  return (
    <Stack.Navigator initialRouteName="PrayerRequestScreen">
      <Stack.Screen
        name="PrayerRequestScreen"
        options={({route, navigation: {goBack}}) => ({
          headerLeft: () => <BackButton goBack={goBack} />,
          headerTitle: () => <Subheading>Prayer Wall</Subheading>,
        })}
        component={PrayerRequest}
      />
      <Stack.Screen
        name="PrayRequestDetailScreen"
        options={({route, navigation: {goBack}}) => ({
          headerLeft: () => <BackButton goBack={goBack} />,
          headerTitle: () => (
            <Subheading>
              {route.params.body.replace(/(\r\n|\n|\r)/gm, ' ').length > 30
                ? route.params.body
                    .substring(0, 30)
                    .replace(/(\r\n|\n|\r)/gm, ' ') + '...'
                : route.params.body.replace(/(\r\n|\n|\r)/gm, ' ')}
            </Subheading>
          ),
        })}
        component={ViewPrayerRequest}
      />
    </Stack.Navigator>
  );
};

export default PrayRequests;
