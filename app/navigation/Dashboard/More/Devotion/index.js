import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {IconButton, Subheading} from 'react-native-paper';
import BackButton from "../../../custom/BackButton";

const Stack = createStackNavigator();

import DailyDevotion from '../../../../screens/Dashboard/More/Devotion';
import ViewDailyDevotion from '../../../../screens/Dashboard/More/Devotion/ViewDailyDevotion';

const Devotion = () => {
  return (
    <Stack.Navigator initialRouteName="DailyDevotionScreen">
      <Stack.Screen
        name="DailyDevotionScreen"
        options={({route, navigation: {goBack}}) => ({
          // headerLeft: () => (
          //   <IconButton
          //     icon="arrow-back"
          //     onPress={() => navigate('Dashboard', {screen: route.screen})}
          //   />
          // ),
          headerLeft: () => <BackButton goBack={goBack} />,
          headerTitle: () => <Subheading>Devotion</Subheading>,
        })}
        component={DailyDevotion}
      />
      <Stack.Screen
        name="DailyDevotionDetailScreen"
        options={({route, navigation: {goBack}}) => ({
          headerLeft: () => <BackButton goBack={goBack} />,
          headerTitle: () => (
            <Subheading>
              {route.params.title.substring(0, 30)}
              {route.params.title.length > 30 ? '...' : ''}
            </Subheading>
          ),
        })}
        component={ViewDailyDevotion}
      />
    </Stack.Navigator>
  );
};

export default Devotion;
