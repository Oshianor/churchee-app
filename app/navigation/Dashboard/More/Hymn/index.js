import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {IconButton, Subheading} from 'react-native-paper';
import BackButton from "../../../custom/BackButton"

const Stack = createStackNavigator();

import Hymn from '../../../../screens/Dashboard/More/Hymn';
import ViewHymn from '../../../../screens/Dashboard/More/Hymn/ViewHymn';

const Sermons = () => {
  return (
    <Stack.Navigator initialRouteName="HymnScreen" headerMode="screen">
      <Stack.Screen
        name="HymnScreen"
        options={({route, navigation: {goBack}}) => ({
          headerLeft: () => <BackButton goBack={goBack} />,
          headerTitle: () => <Subheading>Hymn</Subheading>,
        })}
        component={Hymn}
      />
      <Stack.Screen
        name="HymnDetailScreen"
        options={({route, navigation: {goBack}}) => ({
          headerLeft: () => <BackButton goBack={goBack} />,
          headerTitle: () => <Subheading>{route.params.item.title}</Subheading>,
        })}
        component={ViewHymn}
      />
    </Stack.Navigator>
  );
};

export default Sermons;
