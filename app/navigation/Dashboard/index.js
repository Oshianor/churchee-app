import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ThemeContext} from '../../context/ThemeContext';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Home from './Home';
import Events from './Event';
import Give from './Give';
import Bible from './Bible';
import More from './More';
const BottomTab = createBottomTabNavigator();


const Dashboard = () => {
  const {baseColor} = React.useContext(ThemeContext);
  return (
    <BottomTab.Navigator
      // headerMode="screen"
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = `home`;
          } else if (route.name === 'Bible') {
            iconName = `book`;
          } else if (route.name === 'Event') {
            iconName = `event`;
          } else if (route.name === 'Give') {
            iconName = `monetization-on`;
          } else if (route.name === 'More') {
            iconName = `more-vert`;
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: baseColor,
        inactiveTintColor: 'gray',
      }}>
      <BottomTab.Screen name="Home" component={Home} />
      <BottomTab.Screen name="Bible" component={Bible} />
      <BottomTab.Screen name="Event" component={Events} />
      <BottomTab.Screen name="Give" component={Give} />
      <BottomTab.Screen name="More" component={More} />
    </BottomTab.Navigator>
  );
};

export default Dashboard;
