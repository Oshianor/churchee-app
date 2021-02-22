import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {IconButton, Subheading} from 'react-native-paper';
import BackButton from '../../../custom/BackButton';

const Stack = createStackNavigator();

import Forms from '../../../../screens/Dashboard/More/Forms';
import FormNewMember from '../../../../screens/Dashboard/More/Forms/FormNewMember';
import FormChildDedication from '../../../../screens/Dashboard/More/Forms/FormChildDedication';
import FormConnection from '../../../../screens/Dashboard/More/Forms/FormConnection';
import FormVolunteer from '../../../../screens/Dashboard/More/Forms/FormVolunteer';
import FormFeedback from '../../../../screens/Dashboard/More/Forms/FormFeedback';
import FormSurvey from '../../../../screens/Dashboard/More/Forms/FormSurvey';
import FormMembership from '../../../../screens/Dashboard/More/Forms/FormMembership';

const Form = () => {
  return (
    <Stack.Navigator initialRouteName="FormScreen">
      <Stack.Screen
        name="FormScreen"
        options={({route, navigation: {goBack}}) => ({
          headerLeft: () => <BackButton goBack={goBack} />,
          headerTitle: () => <Subheading>Forms</Subheading>,
        })}
        component={Forms}
      />
      <Stack.Screen
        name="FormNewMemberScreen"
        options={({route, navigation: {goBack}}) => ({
          headerLeft: () => <BackButton goBack={goBack} />,

          headerTitle: () => <Subheading>New Member Form</Subheading>,
        })}
        component={FormNewMember}
      />
      <Stack.Screen
        name="FormChildDedicationScreen"
        options={({route, navigation: {goBack}}) => ({
          headerLeft: () => <BackButton goBack={goBack} />,

          headerTitle: () => <Subheading>Child Dedication Form</Subheading>,
        })}
        component={FormChildDedication}
      />
      <Stack.Screen
        name="FormConnection"
        options={({route, navigation: {goBack}}) => ({
          headerLeft: () => <BackButton goBack={goBack} />,

          headerTitle: () => <Subheading>Connection Card</Subheading>,
        })}
        component={FormConnection}
      />
      <Stack.Screen
        name="FormVolunteer"
        options={({route, navigation: {goBack}}) => ({
          headerLeft: () => <BackButton goBack={goBack} />,

          headerTitle: () => <Subheading>Volunteer Sign-Up</Subheading>,
        })}
        component={FormVolunteer}
      />
      <Stack.Screen
        name="FormFeedback"
        options={({route, navigation: {goBack}}) => ({
          headerLeft: () => <BackButton goBack={goBack} />,
          headerTitle: () => <Subheading>Feedback</Subheading>,
        })}
        component={FormFeedback}
      />
      <Stack.Screen
        name="FormSurvey"
        options={({route, navigation: {goBack}}) => ({
          headerLeft: () => <BackButton goBack={goBack} />,
          headerTitle: () => <Subheading>Survey</Subheading>,
        })}
        component={FormSurvey}
      />
      <Stack.Screen
        name="FormMembership"
        options={({route, navigation: {goBack}}) => ({
          headerLeft: () => <BackButton goBack={goBack} />,
          headerTitle: () => <Subheading>Membership</Subheading>,
        })}
        component={FormMembership}
      />
    </Stack.Navigator>
  );
};

export default Form;
