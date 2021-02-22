import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {IconButton, Subheading} from 'react-native-paper';
import BackButton from "../../../custom/BackButton"
import Media from '../../../../screens/Dashboard/More/Media';
import ViewMedia from '../../../../screens/Dashboard/More/Media/ViewMedia';
import ViewMediaPicture from '../../../../screens/Dashboard/More/Media/ViewMediaPicture';
import ViewMediaVideo from '../../../../screens/Dashboard/More/Media/ViewMediaVideo';
const Stack = createStackNavigator();

const Medias = () => {
  return (
    <Stack.Navigator initialRouteName="MediaScreen">
      <Stack.Screen
        name="MediaScreen"
        options={({route, navigation: {goBack}}) => ({
          headerLeft: () => (
            <BackButton goBack={goBack} />
          ),
          headerTitle: () => <Subheading>Media</Subheading>,
        })}
        component={Media}
      />
      <Stack.Screen
        name="MediaDetailScreen"
        options={({route, navigation: {goBack}}) => ({
          headerLeft: () => (
            <BackButton goBack={goBack} />
          ),
          headerTitle: () => <Subheading>{route.params.name}</Subheading>,
        })}
        component={ViewMedia}
      />
      <Stack.Screen
        name="MediaVideoDetailScreen"
        options={{headerShown: false}}
        component={ViewMediaVideo}
      />
      <Stack.Screen
        name="MediaPictureDetailScreen"
        options={{headerShown: false}}
        component={ViewMediaPicture}
      />
    </Stack.Navigator>
  );
};

export default Medias;
