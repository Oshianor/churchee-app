import React from 'react';
import {View, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import {Caption, Subheading, Surface} from 'react-native-paper';
import {Radio} from '../../../../components/Radio';
import {ThemeContext} from '../../../../context/ThemeContext';
import {Button} from '../../../../components/Button';
import axios from 'axios';
import {api} from '../../../../api';
import {useSelector, useDispatch} from 'react-redux';
import {feedbackAction} from '../../../../store/actions';

const CreateRoom = ({navigation: {navigate}}) => {
  const dispatch = useDispatch();
  const {token} = useSelector(({account}) => account);
  const [value, setValue] = React.useState({
    roomDesc: '',
    roomName: '',
    roomType: 'PUBLIC',
  });

  const handleCreateRoom = async () => {
    try {
      if (value.roomName === '') {
        dispatch(
          feedbackAction.launch({
            msg: 'Room name is required',
            open: true,
            severity: 'w',
          }),
        );
        return;
      }
      dispatch(
        feedbackAction.launch({
          loading: true,
        }),
      );

      const room = await axios.post(api.createRoom, value, {
        headers: {userAuth: token},
      });

      console.log('room', room);

      dispatch(
        feedbackAction.launch({
          msg: 'Room successfully created',
          open: true,
          severity: 's',
          loading: false,
        }),
      );
      navigate('AddModerator');
    } catch (error) {
      dispatch(
        feedbackAction.launch({
          msg: 'Something went wrong',
          open: true,
          severity: 'w',
          loading: false,
        }),
      );

      console.log('error', error);
      console.log('error', error.response);
    }
  };

  return (
    <ThemeContext.Consumer>
      {({theme}) => (
        <View style={classes.root}>
          <View style={classes.privacyRoot}>
            <Subheading style={classes.privacyTitle}>Privacy</Subheading>
            <Surface style={classes.privacyBody}>
              <TouchableOpacity
                onPress={() => setValue({...value, roomType: 'PRIVATE'})}
                style={classes.privacyItem}>
                <Subheading style={classes.privacySubTitle}>Private</Subheading>
                <Radio selected={value.roomType === 'PRIVATE'} />
              </TouchableOpacity>
              <TouchableOpacity
                style={classes.privacyItem}
                onPress={() => setValue({...value, roomType: 'PUBLIC'})}>
                <Subheading style={classes.privacySubTitle}>Public</Subheading>
                <Radio selected={value.roomType === 'PUBLIC'} />
              </TouchableOpacity>
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
                onChangeText={(roomName) => setValue({...value, roomName})}
                value={value.roomName}
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
                onChangeText={(roomDesc) => setValue({...value, roomDesc})}
                value={value.roomDesc}
              />
            </Surface>
            <Caption style={classes.privacyCaption}>
              Description can only be alphanumeric and shorter than 160
              characters.
            </Caption>
          </View>

          <View style={classes.buttonRoot}>
            <Button label="Create Room" onPress={handleCreateRoom} />
          </View>
        </View>
      )}
    </ThemeContext.Consumer>
  );
};

export default CreateRoom;

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
