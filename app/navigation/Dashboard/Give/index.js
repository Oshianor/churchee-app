import React from 'react';
import { Subheading} from 'react-native-paper';
import {createStackNavigator} from '@react-navigation/stack';
import BackButton from "../../custom/BackButton";
const Stack = createStackNavigator();

import Give from '../../../screens/Dashboard/Give';
import GiveHistory from '../../../screens/Dashboard/Give/History';

const Gives = () => {
  return (
    <Stack.Navigator headerMode="screen">
      <Stack.Screen
        name="GiveScreen"
        // options={{headerShown: false}}
        options={({route, navigation: {goBack}}) => ({
          // headerLeft: () => <BackButton goBack={goBack} />,
          headerTitle: () => <Subheading>Give</Subheading>,
        })}
        component={Give}
      />
      <Stack.Screen
        name="GiveHistoryScreen"
        options={({route, navigation: {goBack}}) => ({
          headerLeft: () => <BackButton goBack={goBack} />,
          headerTitle: () => <Subheading>History</Subheading>,
        })}
        component={GiveHistory}
      />
    </Stack.Navigator>
  );
};

export default Gives;