import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Subheading} from 'react-native-paper';
import BackButton from "../../custom/BackButton"
import ProfileHome from '../../../screens/Dashboard/Profile';
import ProfileSavedEvent from '../../../screens/Dashboard/Profile/ProfileSavedEvent';
import Notes from '../../../screens/Dashboard/Profile/Notes';
import AddNotes from '../../../screens/Dashboard/Profile/Notes/AddNotes';
import EditNotes from '../../../screens/Dashboard/Profile/Notes/EditNotes';
import ViewNote from '../../../screens/Dashboard/Profile/Notes/ViewNote';
import ProfileEdit from '../../../screens/Dashboard/Profile/ProfileEdit';
const Stack = createStackNavigator();


const Profile = () => {
  return (
    <Stack.Navigator initialRouteName="ProfileHomeScreen">
      <Stack.Screen
        name="ProfileHomeScreen"
        options={({route, navigation: {goBack}}) => ({
          headerLeft: () => <BackButton goBack={goBack} />,
          headerTitle: () => <Subheading>Profile</Subheading>,
        })}
        component={ProfileHome}
      />
      <Stack.Screen
        name="NoteScreen"
        options={({route, navigation: {goBack}}) => ({
          headerLeft: () => <BackButton goBack={goBack} />,
          headerTitle: () => <Subheading>Your Notes</Subheading>,
        })}
        component={Notes}
      />
      <Stack.Screen
        name="AddNoteScreen"
        options={({route, navigation: {goBack}}) => ({
          headerLeft: () => <BackButton goBack={goBack} />,
          headerTitle: () => <Subheading>Add Note</Subheading>,
        })}
        component={AddNotes}
      />
      <Stack.Screen
        name="EditNoteScreen"
        options={({route, navigation: {goBack}}) => ({
          headerLeft: () => <BackButton goBack={goBack} />,
          headerTitle: () => <Subheading>Edit Note</Subheading>,
        })}
        component={EditNotes}
      />
      <Stack.Screen
        name="NoteDetailScreen"
        options={({route, navigation: {goBack}}) => ({
          headerLeft: () => <BackButton goBack={goBack} />,
          headerTitle: () => <Subheading>View Note</Subheading>,
        })}
        component={ViewNote}
      />
      <Stack.Screen
        name="ProfileEditScreen"
        options={({route, navigation: {goBack}}) => ({
          headerLeft: () => <BackButton goBack={goBack} />,
          headerTitle: () => <Subheading>Edit Profile</Subheading>,
        })}
        component={ProfileEdit}
      />
      <Stack.Screen
        name="ProfileSavedEventScreen"
        options={({route, navigation: {goBack}}) => ({
          headerLeft: () => <BackButton goBack={goBack} />,
          headerTitle: () => <Subheading>Saved Events</Subheading>,
        })}
        component={ProfileSavedEvent}
      />
    </Stack.Navigator>
  );
};

export default Profile;
