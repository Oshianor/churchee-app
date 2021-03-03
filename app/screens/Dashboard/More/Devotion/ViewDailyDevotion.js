import React, {Component} from 'react';
import {
  IconButton,
  Button,
  Paragraph,
  Title,
} from 'react-native-paper';
import {View, Dimensions, StyleSheet, ScrollView, Image, Share } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux';
import moment from "moment"; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api, publicToken } from "../../../../api";
import Wrapper from "../../../../components/Background";
import Video from 'react-native-video';
import {ThemeContext} from '../../../../context/ThemeContext';
import Axios from 'axios';
import {Youtube, AudioPlayer} from '../../../../components/Random';


const mapStateToProps = (state) => ({
  account: state.account
})

const { width, height } = Dimensions.get('screen');

const DailyDevotionDetails = ({ route, navigation, account }) => {
  const [open, setOpen] = React.useState(false);
  const [paused, setPaused] = React.useState(false);
  const [login, setLogin] = React.useState(false);
  const [favourite, setFavourite] = React.useState([]);
  const {fontSize} = React.useContext(ThemeContext);
  const {title, body, _id, date, video, audio, img, youtubeId} = route.params;
  console.log('youtubeId', youtubeId);
  

  const [res, setRes] = React.useState({
    visible: false,
    msg: '',
    type: ''
  })


  React.useEffect(() => {
    handleSavedDevotion();
  }, [])


  const handleSavedDevotion = async () => {
    try {
      const favouriteDevotion = await AsyncStorage.getItem('favouriteDevotion');
      const favourite = JSON.parse(favouriteDevotion);

      setFavourite(favourite ? favourite : []);
    } catch (error) {
      console.log('favourite', error);
    }
  }


  const onShare = async () => {
    try {
      const result = await Share.share({
        title: title,
        message: body,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('result.activityType', result.activityType);

          // shared with activity type of result.activityType
        } else {
          // shared
          console.log('result-type.activityType', result.action);
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
        console.log('result-type.activityType', result.action);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleAddFavourite = async () => {
    if (!account.token) {
      setLogin(true) 
      navigation.navigate('Login');

      return
    }
    try {
      const savedItem = await Axios.put(api.savedItem, {
        type: 'devotion',
        value: _id,
      },
      {
        headers: {
          "x-auth-token": account.token,
          publicToken
        }
      });

      const favourite = savedItem.data.content ? savedItem.data.content : [];

      await AsyncStorage.setItem(
        'favouriteDevotion',
        JSON.stringify(favourite),
      );

      setFavourite(favourite);
      setRes({
        visible: true,
        msg: 'Devotion has been added as a favorite',
        type: 's',
      });
    } catch (error) {
      setRes({
        visible: true,
        msg: error.response.data,
        type: 'w',
      });
    }
  };

  const handleAuthClose = (visible, msg, type) => {
    setLogin(false)
    setRes({
      visible,
      msg,
      type,
    });
  };

  const handleToggle = () => {
    setOpen(!open)
  };

  const fslg = {
    fontSize: fontSize + 5,
    paddingVertical: 5,
  };
  const fssm = {
    fontSize: fontSize,
    paddingVertical: 5,
  };

  return (
    <ThemeContext.Consumer>
      {({theme, baseColor}) => (
        <View style={[classes.root, {backgroundColor: theme.background}]}>
          <Wrapper>
            {youtubeId ? (
              <Youtube videoId={youtubeId} />
            ) : (
              <Image source={{uri: api.img + img}} style={classes.img} />
            )}
            <ScrollView contentContainerStyle={classes.container}>
              <Title style={fslg}>{title}</Title>
              <View style={classes.rootDetail}>
                <View style={classes.sideleft}>
                  <Icon name="calendar" size={25} />
                  <Paragraph>{moment(date).format('MMMM DD, YYYY')}</Paragraph>
                </View>
                <View style={classes.sideright}>
                  <IconButton icon="alarm" size={25} />
                  <Paragraph>{moment(date).format('hh:mmA')}</Paragraph>
                </View>
              </View>

              <View style={{flexDirection: 'row'}}>
                {video && (
                  <Button
                    icon="television"
                    mode="outlined"
                    onPress={() =>
                      navigation.navigate('VideoPlayerScreen', {
                        video: video,
                        title: title,
                      })
                    }>
                    Watch
                  </Button>
                )}

                {audio && (
                  <Button mode="outlined" onPress={handleToggle}>
                    Listen to Audio
                  </Button>
                )}
              </View>

              <Paragraph style={[classes.text, fssm]}>{body}</Paragraph>
              {/* login modal  */}
              {/* <AuthComponent open={login} handleClose={handleAuthClose} /> */}
              <AudioPlayer
                item={route.params}
                open={open}
                handleClose={handleToggle}
              />
            </ScrollView>
            <View style={classes.bottom}>
              <IconButton onPress={onShare} icon="share" size={35} />
              <IconButton
                icon={favourite.includes(_id) ? 'heart' : 'heart-outline'}
                size={35}
                onPress={handleAddFavourite}
                color={favourite.includes(_id) ? baseColor : theme.icon}
              />
            </View>
          </Wrapper>
        </View>
      )}
    </ThemeContext.Consumer>
  );
}

export default connect(mapStateToProps)(DailyDevotionDetails);


const classes = StyleSheet.create({
  root: {
    // padding: 10,
    flex: 1,
    // marginVertical: 10,
    // paddingHorizontal: 15,
  },
  container: {
    marginHorizontal: 10,
    // flex: 1,
    // paddingHorizontal: 15,
  },
  rootDetail: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  sideleft: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
  sideright: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
  },
  body: {
    flexDirection: 'row',
    textAlign: 'left',
    flexWrap: 'wrap',
    fontSize: 15,
  },
  text: {
    marginTop: 20
    // alignSelf: 'center',
  },
  img: {
    width: width,
    height: height / 3.5,
    // padding: 2,
  },
  headerRight: {
    flex: 1,
    justifyContent: 'flex-end',
    marginHorizontal: 15,
    alignItems: 'center',
    flexDirection: 'row',
  },
  bottom: {
    // flex: 0.2,
    marginBottom: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  icons: {
    marginRight: 5,
  },
  title: {flex: 1, justifyContent: 'flex-start'},
});