import React from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import {Caption, Subheading, Surface, Avatar} from 'react-native-paper';
import {Radio} from '../../../../components/Radio';
import {baseColor, ThemeContext} from '../../../../context/ThemeContext';
import {Button} from '../../../../components/Button';
import axios from 'axios';
import {api} from '../../../../api';
import {useSelector, useDispatch} from 'react-redux';
import {feedbackAction} from '../../../../store/actions';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import img from '../../../../images';
import {colors} from '../../../../theme';

const CreateRoom = ({navigation: {navigate}}) => {
  const dispatch = useDispatch();
  const {token} = useSelector(({account}) => account);
  const [value, setValue] = React.useState({
    roomDesc: '',
    roomName: '',
    roomType: 'PUBLIC',
    base64Image: '',
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
      navigate('AddModerator', {room: room.data.data});
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

  const openGallary = async () => {
    // ImagePicker.openPicker({
    //   width: 300,
    //   height: 400,
    //   cropping: true,
    // }).then((image) => {
    //   console.log(image);
    // });

    ImagePicker.openPicker({
      includeBase64: true,
      cropping: true,
      compressImageQuality: Platform.OS === 'android' ? 0.6 : 0.8,
    })
      .then((image) => {
        console.log('the images', image);
        const prefixImg = 'data:image/png;base64,';
        setValue({...value, base64Image: `${prefixImg}${image.data}`});
      })
      .catch((err) => console.error(err));
  };

  return (
    <ThemeContext.Consumer>
      {({theme, baseColor}) => (
        <View style={classes.root}>
          <ScrollView>
            <View style={classes.imageRoot}>
              {value.base64Image ? (
                <Avatar.Image
                  source={{uri: value.base64Image}}
                  size={100}
                  style={{
                    backgroundColor: 'white',
                  }}
                />
              ) : (
                <Avatar.Image
                  source={img.user}
                  size={100}
                  style={{
                    backgroundColor: 'white',
                  }}
                />
              )}

              <TouchableOpacity
                onPress={openGallary}
                style={[classes.iconRoot, {backgroundColor: baseColor}]}>
                <Icon name="camera" size={20} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setValue({...value, base64Image: ''})}
                style={classes.removeRoot}>
                <Icon name="delete" size={20} color={colors.red} />
                <Subheading>Remove Picture</Subheading>
              </TouchableOpacity>
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

            <View style={classes.privacyRoot}>
              <Subheading style={classes.privacyTitle}>Privacy</Subheading>
              <Surface style={classes.privacyBody}>
                <TouchableOpacity
                  onPress={() => setValue({...value, roomType: 'PRIVATE'})}
                  style={classes.privacyItem}>
                  <Subheading style={classes.privacySubTitle}>
                    Private
                  </Subheading>
                  <Radio selected={value.roomType === 'PRIVATE'} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={classes.privacyItem}
                  onPress={() => setValue({...value, roomType: 'PUBLIC'})}>
                  <Subheading style={classes.privacySubTitle}>
                    Public
                  </Subheading>
                  <Radio selected={value.roomType === 'PUBLIC'} />
                </TouchableOpacity>
              </Surface>
              <Caption style={classes.privacyCaption}>
                Explanation of what differentiates Private and Public Rooms
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
          </ScrollView>
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
  imageRoot: {
    marginHorizontal: 20,
    paddingVertical: 10,
  },
  iconRoot: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -35,
    marginLeft: 75,
    height: 35,
    width: 35,
    borderRadius: 35,
  },
  removeRoot: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 200,
    marginTop: 10,
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
