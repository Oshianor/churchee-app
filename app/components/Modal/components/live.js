import React from 'react';
import {
  Surface,
  IconButton,
  Subheading,
} from 'react-native-paper';
import {
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Image,
  Linking,
  Modal,
} from 'react-native';
import {useSelector} from 'react-redux';
import img from '../../../images';
const {width, height} = Dimensions.get('screen');


const Live = ({open, handleClose}) => {
  const {live} = useSelector(({account}) => account);

  return (
    <View style={classes.root}>
      <Modal animationType="slide" transparent={true} visible={open === 'live'}>
        <View style={classes.modalRoot}>
          <Surface style={classes.modalContainer}>
            {live?.FBUrl !== '' && (
              <TouchableOpacity
                style={classes.listRoot}
                onPress={() => Linking.openURL(live?.FBUrl)}
              >
                <Image source={img.facebook} style={classes.iconImg} />
                <Subheading>Facebook Live</Subheading>
              </TouchableOpacity>
            )}
            {live?.IGUrl !== '' && (
              <TouchableOpacity
                style={classes.listRoot}
                onPress={() => Linking.openURL(live?.IGUrl)}
              >
                <Image source={img.instagram} style={classes.iconImg} />
                <Subheading>Instagram Live</Subheading>
              </TouchableOpacity>
            )}
            {live?.url !== '' && (
              <TouchableOpacity
                style={classes.listRoot}
                onPress={() => Linking.openURL(live?.url)}
              >
                <Image source={img.youtube} style={classes.iconImg} />
                <Subheading>YouTube Live</Subheading>
              </TouchableOpacity>
            )}
          </Surface>
          <View style={{marginTop: 25}}>
            <IconButton
              onPress={() => handleClose()}
              icon="close"
              size={35}
              color="white"
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Live;

const classes = StyleSheet.create({
  root: {
    flex: 1,
  },
  modalRoot: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    width: width / 1.5,
    padding: 20,
    borderRadius: 5,
    elevation: 12,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 5,
  },
  surface: {
    // borderRadius: 5,
    width: width / 2.2,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 1,
  },
  imgBack: {
    width: width / 2.2,
    height: height / 7.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: width / 2.2,
    height: height / 7.5,
  },
  body: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontStyle: 'italic',
    color: 'white',
    width: width / 2.5,
  },
  icon: {
    color: 'white',
  },
  caption: {
    color: 'white',
  },
  iconImg: {width: 25, height: 25, marginRight: 10},
  listRoot: {
    flexDirection: 'row',
    marginVertical: 10,
    justifyContent: 'center',
  },
});
