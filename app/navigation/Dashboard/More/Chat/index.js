import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Subheading} from 'react-native-paper';
import BackButton from '../../../custom/BackButton';
import TitleButton from '../../../custom/TitleButton';
import RoomHome from "../../../../screens/Dashboard/More/Chat"
import RoomInfo from '../../../../screens/Dashboard/More/Chat/roomInfo';
import CreateRoom from "../../../../screens/Dashboard/More/Chat/createRoom";
import AddModerator from "../../../../screens/Dashboard/More/Chat/AddModerator";
import Search from "../../../../screens/Dashboard/More/Chat/search";
import RoomChat from '../../../../screens/Dashboard/More/Chat/roomChat';
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import {TouchableOpacity, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

const Room = () => {
    const {
      church: {name},
    } = useSelector(({church}) => church);
    const {
      token,
      user
    } = useSelector(({account}) => account);
  return (
    <Stack.Navigator initialRouteName="ChatTabs">
      <Stack.Screen
        name="ChatTabs"
        options={({route, navigation: {goBack, navigate}}) => ({
          // headerLeft: () => <BackButton goBack={goBack} />,
          headerLeft: () => <TitleButton navigate={goBack} label={`${name}'s Room space`} />,
          // headerTitle: () => (
          //   <Subheading
          //     style={{
          //       textTransform: 'capitalize',
          //     }}>{`${name}'s Room space`}</Subheading>
          // ),
          title: '',
          headerRight: () =>
            token ? (
              <TouchableOpacity
                style={classes.addGroup}
                onPress={() => navigate('CreateRoom')}>
                <Icon name="account-multiple-plus" size={35} />
              </TouchableOpacity>
            ) : null,
        })}
        component={ChatTabs}
      />
      <Stack.Screen
        name="RoomInfo"
        options={({route, navigation: {goBack}}) => ({
          headerLeft: () => <BackButton goBack={goBack} />,
          headerTitle: () => <Subheading>About Group Chat</Subheading>,
        })}
        component={RoomInfo}
      />
      <Stack.Screen
        name="CreateRoom"
        options={({navigation: {goBack}}) => ({
          headerLeft: () => <BackButton goBack={goBack} />,
          headerTitle: () => <Subheading>New Room</Subheading>,
        })}
        component={CreateRoom}
      />
      <Stack.Screen
        name="AddModerator"
        options={({navigation: {goBack, navigate}}) => ({
          headerLeft: () => <BackButton goBack={goBack} />,
          headerTitle: () => <Subheading>Add Moderator</Subheading>,
          headerRight: () => (
            <TouchableOpacity
              style={{marginRight: 20}}
              onPress={() => navigate('Search')}>
              <Icon name="magnify" size={30} />
            </TouchableOpacity>
          ),
        })}
        component={AddModerator}
      />
      <Stack.Screen
        name="Search"
        options={({navigation: {goBack}}) => ({
          headerLeft: () => <BackButton goBack={goBack} />,
          headerTitle: () => <Subheading>Search</Subheading>,
        })}
        component={Search}
      />
      <Stack.Screen
        name="RoomChat"
        options={({navigation: {goBack}}) => ({
          headerLeft: () => <BackButton goBack={goBack} />,
          // headerTitle: () => <Subheading>Search</Subheading>,
        })}
        component={RoomChat}
      />
    </Stack.Navigator>
  );
};

const ChatTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="RoomHome" options={{title: 'Rooms'}} component={RoomHome} />
      <Tab.Screen
        name="MessageHome"
        options={{title: 'Messages'}}
        component={RoomHome}
      />
      <Tab.Screen
        name="SettingHome"
        options={{title: 'Settings'}}
        component={RoomHome}
      />
    </Tab.Navigator>
  );
}


const classes = StyleSheet.create({
  addGroup: {
    marginRight: 20
  },
});

// const RoomStack = () => {
//   return (
//     <Stack.Navigator initialRouteName="RoomInfo">
//       <Stack.Screen
//         name="RoomInfo"
//         options={{headerShown: false}}
//         component={RoomInfo}
//       />
//     </Stack.Navigator>
//   );
// };

export default Room;