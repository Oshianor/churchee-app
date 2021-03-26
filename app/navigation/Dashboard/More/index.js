import React from 'react';
import { TouchableOpacity } from "react-native"
import {createStackNavigator} from '@react-navigation/stack';
import {Subheading} from 'react-native-paper';
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import {useSelector} from 'react-redux';;
import More from '../../../screens/Dashboard/More';
import BackButton from '../../custom/BackButton';
import Setting from '../../../screens/Dashboard/More/Setting';
const Stack = createStackNavigator();


const Mores = () => {
  const {token} = useSelector(({ account }) => account);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MoreScreen"
        component={More}
        options={({route, navigation: {navigate}}) => ({
          headerRight: () => (
            <TouchableOpacity
              style={{marginRight: 10}}
              onPress={() =>
                token
                  ? navigate('Profile')
                  : navigate('Onboarding', {screen: 'Login'})
              }>
              <Icon name={token ? 'account-circle' : 'login'} size={30} />
            </TouchableOpacity>
          ),
          headerTitle: () => <Subheading>More</Subheading>,
        })}
      />
      <Stack.Screen
        name="SettingScreen"
        options={({route, navigation: {goBack}}) => ({
          headerLeft: () => <BackButton goBack={goBack} />,
          headerTitle: () => <Subheading>Setting</Subheading>,
        })}
        component={Setting}
      />
    </Stack.Navigator>
  );
};

export default Mores;