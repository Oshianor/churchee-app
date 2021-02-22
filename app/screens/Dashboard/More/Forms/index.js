import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Card, Surface, Subheading, Paragraph, IconButton} from 'react-native-paper';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {ThemeContext} from '../../../../context/ThemeContext';
import img from '../../../../images';

const screen = Dimensions.get('screen');


const Forms = ({ navigation: { navigate }}) => {
  return (
    <ThemeContext.Consumer>
      {({theme, baseColor}) => (
        <SafeAreaView
          style={[classes.root, {backgroundColor: theme.background}]}>
          <ScrollView contentContainerStyle={classes.body}>
            <View style={classes.rootView}>
              <View style={classes.section}>
                <TouchableOpacity
                  onPress={() => navigate('FormNewMemberScreen')}>
                  <Surface style={classes.surface}>
                    <Card.Cover style={classes.img} source={img.welcome} />
                  </Surface>
                  <Subheading>New Member Form</Subheading>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigate('FormChildDedicationScreen')}>
                  <Surface style={classes.surface}>
                    <Card.Cover
                      style={classes.img}
                      source={img.childDedication}
                    />
                  </Surface>
                  <Subheading>Child Dedication</Subheading>
                </TouchableOpacity>
              </View>

              <View style={classes.section}>
                <TouchableOpacity onPress={() => navigate('FormConnection')}>
                  <Surface style={classes.surface}>
                    <Card.Cover style={classes.img} source={img.connection} />
                  </Surface>
                  <Subheading>Connection Card</Subheading>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigate('FormVolunteer')}>
                  <Surface style={classes.surface}>
                    <Card.Cover style={classes.img} source={img.volunteer} />
                  </Surface>
                  <Subheading>Volunteer Sign-Up</Subheading>
                </TouchableOpacity>
              </View>

              <View style={classes.section}>
                <TouchableOpacity onPress={() => navigate('FormMembership')}>
                  <Surface style={classes.surface}>
                    <Card.Cover style={classes.img} source={img.membership} />
                  </Surface>
                  <Subheading>Membership</Subheading>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigate('FormFeedback')}>
                  <Surface style={classes.surface}>
                    <Card.Cover style={classes.img} source={img.feedback} />
                  </Surface>
                  <Subheading>Feedback</Subheading>
                </TouchableOpacity>
              </View>
            </View>

            <View style={classes.section}>
              <TouchableOpacity onPress={() => navigate('FormSurvey')}>
                <Surface style={classes.surface}>
                  <Card.Cover
                    style={classes.img}
                    source={img.survey}
                  />
                </Surface>
                <Subheading>Survey</Subheading>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      )}
    </ThemeContext.Consumer>
  );
}

export default Forms;

const classes = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
  },
  swiper: {
    height: screen.height / 3.5,
    marginBottom: 10,
  },
  body: {
    // flex: 1,
    marginHorizontal: 10,
  },
  rootView: {
    flex: 1,
    marginVertical: 10,
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 5,
  },
  surface: {
    padding: 8,
    height: screen.height / 7.5,
    width: screen.width / 2.2,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  img: {
    resizeMode: 'cover',
    height: screen.height / 7.5,
    width: screen.width / 2.2,
  },
});
