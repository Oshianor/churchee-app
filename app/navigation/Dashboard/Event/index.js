import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import BackButton from "../../custom/BackButton";
import { Subheading} from 'react-native-paper';
const Stack = createStackNavigator();

import Event from '../../../screens/Dashboard/Event';
import ViewEvent from '../../../screens/Dashboard/Event/ViewEvent';

const Events = () => {
  return (
    <Stack.Navigator headerMode="screen">
      <Stack.Screen
        name="EventScreen"
        // options={{headerShown: false}}
        options={({route, navigation: {goBack}}) => ({
          headerTitle: () => <Subheading>Events</Subheading>,
        })}
        component={Event}
      />
      <Stack.Screen
        name="EventDetailScreen"
        options={({route, navigation: {goBack}}) => ({
          headerLeft: () => <BackButton goBack={goBack} />,
          headerTitle: () => <Subheading>{route.params.title}</Subheading>,
        })}
        component={ViewEvent}
      />
    </Stack.Navigator>
  );
};

export default Events;