import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {IconButton, Subheading} from 'react-native-paper';
import BackButton from "../../../custom/BackButton"

const Stack = createStackNavigator();

import Sermon from '../../../../screens/Dashboard/More/Sermon';
import ViewSermon from '../../../../screens/Dashboard/More/Sermon/ViewSermon';

const Sermons = () => {
  return (
    <Stack.Navigator initialRouteName="MediaScreen">
      <Stack.Screen
        name="SermonScreen"
        options={({route, navigation: {goBack}}) => ({
          headerLeft: () => <BackButton goBack={goBack} />,
          headerTitle: () => <Subheading>Sermon</Subheading>,
        })}
        component={Sermon}
      />
      <Stack.Screen
        name="SermonDetailScreen"
        options={({route, navigation: {goBack}}) => ({
          headerLeft: () => <BackButton goBack={goBack} />,
          // headerTitle: () => <Subheading>{route.params.title}</Subheading>,
          headerTitle: () => (
            <Subheading>
              {route.params.title.substring(0, 30)}
              {route.params.title.length > 30 ? '...' : ''}
            </Subheading>
          ),
        })}
        component={ViewSermon}
      />
    </Stack.Navigator>
  );
};

export default Sermons;
