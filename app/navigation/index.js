import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Subheading} from 'react-native-paper';
import Onboarding from './Onboarding';
import Dashboard from './Dashboard';
import Devotion from "./Dashboard/More/Devotion";
import Sermon from './Dashboard/More/Sermon';
import Hymn from './Dashboard/More/Hymn';
import Forms from './Dashboard/More/Forms';
import Media from './Dashboard/More/Media';
import PrayerRequest from './Dashboard/More/PrayerRequest';
import PPR from './Dashboard/More/PPR';
import Profile from "./Dashboard/Profile";
import Chat from "./Dashboard/More/Chat"
import SideDrawer from './custom/SideDrawer';
import {useWindowDimensions} from 'react-native';
import VideoPlayer from '../screens/Dashboard/More/Video';
import { useSelector} from 'react-redux';

// const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const Navigation = () => {
  const {token} = useSelector(({account}) => account);
  const {width} = useWindowDimensions();
  return (
    <Drawer.Navigator
      initialRouteName="Onboarding"
      headerMode="screen"
      drawerContent={(props) => <SideDrawer {...props} />}
      // drawerType={width >= 768 ? 'permanent' : 'slide'}
      drawerType={'slide'}
      drawerStyle={{
        width: width >= 768 ? width / 3 : width / 1.2,
      }}>
      <Drawer.Screen
        name="Onboarding"
        options={{headerShown: false}}
        component={Onboarding}
      />
      {token && (
        <>
          <Drawer.Screen
            name="Dashboard"
            options={{headerShown: false}}
            component={Dashboard}
          />
          <Drawer.Screen
            name="Devotion"
            options={{headerShown: false}}
            component={Devotion}
          />
          <Drawer.Screen
            name="Sermon"
            options={{headerShown: false}}
            component={Sermon}
          />
          <Drawer.Screen
            name="Hymn"
            options={{headerShown: false}}
            component={Hymn}
          />
          <Drawer.Screen
            name="Form"
            options={{headerShown: false}}
            component={Forms}
          />
          <Drawer.Screen
            name="Media"
            options={{headerShown: false}}
            component={Media}
          />
          <Drawer.Screen
            name="PrayerRequest"
            options={{headerShown: false}}
            component={PrayerRequest}
          />
          <Drawer.Screen
            name="PPR"
            options={{headerShown: false}}
            component={PPR}
          />
          <Drawer.Screen
            name="Profile"
            options={{headerShown: false}}
            component={Profile}
          />
          <Drawer.Screen
            name="Chat"
            options={{headerShown: false}}
            component={Chat}
          />
          <Drawer.Screen
            name="VideoPlayer"
            options={{headerShown: false}}
            component={VideoPlayer}
          />
        </>
      )}
    </Drawer.Navigator>
  );
};

export default Navigation;
