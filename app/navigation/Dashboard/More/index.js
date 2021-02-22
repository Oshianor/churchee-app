import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {IconButton, Subheading} from 'react-native-paper';
import {connect} from 'react-redux';;
import More from '../../../screens/Dashboard/More';
const Stack = createStackNavigator();

const mapStateToProps = (state) => ({
  account: state.account,
});

const Mores = ({account: {token}}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MoreScreen"
        component={More}
        options={({route, navigation: {navigate}}) => ({
          headerRight: () => (
            <IconButton
              icon="account-circle"
              size={30}
              onPress={() => (token ? navigate('Profile') : navigate('Login'))}
            />
          ),
          headerTitle: () => <Subheading>More</Subheading>,
        })}
      />
    </Stack.Navigator>
  );
};

export default connect(mapStateToProps)(Mores);