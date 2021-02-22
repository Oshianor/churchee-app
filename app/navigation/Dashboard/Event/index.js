import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import BackButton from "../../custom/BackButton";
const Stack = createStackNavigator();

import Event from '../../../screens/Dashboard/Event';
import ViewEvent from '../../../screens/Dashboard/Event/ViewEvent';

const Events = () => {
  return (
    <Stack.Navigator headerMode="screen">
      <Stack.Screen
        name="EventScreen"
        options={{headerShown: false}}
        component={Event}
      />
      <Stack.Screen
        name="EventDetailScreen"
        options={({route, navigation: {goBack}}) => ({
          headerLeft: () => (
            <BackButton goBack={goBack} />
          ),
          headerTitle: () => <Subheading>{route.params.title}</Subheading>,
        })}
        component={ViewEvent}
      />
    </Stack.Navigator>
  );
};

export default Events;