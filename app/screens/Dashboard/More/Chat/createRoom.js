import React from 'react'
import {View, StyleSheet, TextInput} from 'react-native';
import { Caption, Subheading, Surface } from 'react-native-paper';
import { Radio } from '../../../../components/Radio';
import {ThemeContext} from '../../../../context/ThemeContext';
import { Button } from "../../../../components/Button"

const CreateRoom = ({ navigation: { navigate } }) => {
  return (
    <ThemeContext.Consumer>
      {({theme}) => (
        <View style={classes.root}>
          <View style={classes.privacyRoot}>
            <Subheading style={classes.privacyTitle}>Privacy</Subheading>
            <Surface style={classes.privacyBody}>
              <View style={classes.privacyItem}>
                <Subheading style={classes.privacySubTitle}>Private</Subheading>
                <Radio selected />
              </View>
              <View style={classes.privacyItem}>
                <Subheading style={classes.privacySubTitle}>Public</Subheading>
                <Radio />
              </View>
            </Surface>
            <Caption style={classes.privacyCaption}>
              Explanation of what differentiates Private and Public Rooms
            </Caption>
          </View>

          <View style={classes.roomRoot}>
            <Subheading style={classes.privacyTitle}>Room Name</Subheading>
            <Surface style={classes.roomBody}>
              <TextInput
                style={[
                  classes.TextInput,
                  {color: theme.mode ? 'white' : 'black'},
                ]}
                // style={[classes.TextInput, {color: theme.text}]}
                placeholderTextColor={'#bbbbbb'}
                placeholder="#  Name"
                // onChangeText={(email) => setValue({...value, email})}
                // value={value.email}
              />
            </Surface>
            <Caption style={classes.privacyCaption}>
              Names can only be alphanumeric and shorter than 16 characters.
            </Caption>
          </View>

          <View style={classes.DetailsRoot}>
            <Subheading style={classes.privacyTitle}>Description</Subheading>
            <Surface style={classes.DetailsBody}>
              <TextInput
                style={[
                  classes.MultiInput,
                  {color: theme.mode ? 'white' : 'black'},
                ]}
                placeholderTextColor={'#bbbbbb'}
                multiline
                placeholder="#  Brief Description of the room"
                // onChangeText={(email) => setValue({...value, email})}
                // value={value.email}
              />
            </Surface>
            <Caption style={classes.privacyCaption}>
              Description can only be alphanumeric and shorter than 160
              characters.
            </Caption>
          </View>

          <View style={classes.buttonRoot}>
            <Button
              label="Create Room"
              onPress={() => navigate('AddModerator')}
            />
          </View>
        </View>
      )}
    </ThemeContext.Consumer>
  );
}

export default CreateRoom

const classes = StyleSheet.create({
  root: {
    flex: 1,
    // marginHorizontal: 20,
  },
  privacyRoot: {
    // height: 100,
    paddingVertical: 5,
    flex: 2,
  },
  privacyTitle: {
    fontWeight: '600',
    marginHorizontal: 20,
    marginBottom: 5,
  },
  privacyCaption: {
    fontWeight: '300',
    marginHorizontal: 20,
  },
  privacyBody: {
    // backgroundColor: '#FAFAFA',
    height: 80,
    paddingHorizontal: 20,
    elevation: 1,
    justifyContent: 'center',
  },
  privacyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  privacySubTitle: {
    fontWeight: '400',
  },
  roomRoot: {
    marginVertical: 10,
    flex: 2,
    justifyContent: 'flex-start',
    // alignItems: ""
  },
  roomBody: {
    elevation: 1,
    justifyContent: 'center',
    marginVertical: 5,
    // marginHorizontal: 20,
    height: 50,
  },
  TextInput: {
    marginHorizontal: 20,
    width: '100%',
  },
  MultiInput: {
    marginHorizontal: 20,
    width: '100%',
    minHeight: 100,
  },
  DetailsRoot: {
    marginVertical: 10,
    justifyContent: 'flex-start',
    flex: 3,
  },
  DetailsBody: {
    elevation: 1,
    justifyContent: 'center',
    marginVertical: 5,
    // marginHorizontal: 20,
    height: 100,
  },
  buttonRoot: {
    // position: "absolute",
    // bottom: 10,
    // width: "100%",
    marginHorizontal: 20,
    flex: 3,
    justifyContent: 'flex-end',
    marginVertical: 20,
  },
});
