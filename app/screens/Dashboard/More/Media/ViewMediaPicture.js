import React from 'react';
import {
  IconButton,
} from 'react-native-paper';
import {
  View,
  Dimensions,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import GallerySwiper from 'react-native-gallery-swiper';
import {ThemeContext} from '../../../../context/ThemeContext';
import Share from 'react-native-share';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
import { api, publicToken} from '../../../../api';
const { width, height } = Dimensions.get('screen');


const MediaPictureDetail = ({route, navigation: {goBack}}) => {
  const [selected, setSelected] = React.useState(null);
  const [imageId, setImageId] = React.useState(null);
  const [img, setImg] = React.useState([]);
  const [index, setIndex] = React.useState([]);
  const [savedMedia, setSavedMedia] = React.useState([]);
  const account = useSelector(({ account }) => account);

  // const [login, setLogin] = React.useState(false);
  // const [res, setRes] = React.useState({
  //   visible: false,
  //   msg: '',
  //   type: '',
  // });

  // console.log('route', route);

  React.useEffect(() => {
    handleReformat();
  }, []);

  const handleReformat = async () => {
    setSelected(route.params.selected);
    setImageId(route.params.imageId);
    setImg(route.params.img);
    setIndex(route.params.index);

    const savedMedia =  await AsyncStorage.getItem('media');
    setSavedMedia(JSON.parse(savedMedia) ? JSON.parse(savedMedia) : []);
  };

  const InstagramShare = async () => {
    try {
      // const data = await ImgToBase64.getBase64String(api.img + selected);

      // const url = 'https://awesome.contents.com/';
      // const title = 'Awesome Contents';
      // const message = 'Please check this out.';
      // const icon = 'data:image/png;base64,' + data;
      // const options = Platform.select({
      //   ios: {
      //     activityItemSources: [
      //       {
      //         // For sharing url with custom title.
      //         placeholderItem: {type: 'url', content: url},
      //         item: {
      //           default: {type: 'url', content: url},
      //         },
      //         subject: {
      //           default: title,
      //         },
      //         linkMetadata: {originalUrl: url, url, title},
      //       },
      //       {
      //         // For sharing text.
      //         placeholderItem: {type: 'text', content: message},
      //         item: {
      //           default: {type: 'text', content: message},
      //           message, // Specify no text to share via Messages app.
      //         },
      //         linkMetadata: {
      //           // For showing app icon on share preview.
      //           title: message,
      //         },
      //       },
      //       {
      //         // For using custom icon instead of default text icon at share preview when sharing with message.
      //         placeholderItem: {
      //           type: 'url',
      //           content: icon,
      //         },
      //         item: {
      //           default: {
      //             type: 'text',
      //             content: `${message} ${url}`,
      //           },
      //         },
      //         linkMetadata: {
      //           title: message,
      //           icon: icon,
      //         },
      //       },
      //     ],
      //   },
      //   default: {
      //     title,
      //     subject: title,
      //     message: `${message} ${url}`,
      //   },
      // });

      // Share.open(options);

      // console.log('data', data);

      // const shareOptions = {
      //   method: Share.InstagramStories.SHARE_BACKGROUND_IMAGE,
      //   backgroundImage: api.img + selected,
      //   stickerImage: 'data:image/png;base64,' + data,
      //   backgroundBottomColor: '#fefefe',
      //   backgroundTopColor: '#906df4',
      //   social: Share.Social.INSTAGRAM_STORIES,
      // };
      // Share.shareSingle(shareOptions);
    } catch (error) {
      console.log('error', error);
    }
  };


  const FacebookShare = async () => {
    try {
      // console.log(api.img + selected);
      
      // const data = await ImgToBase64.getBase64String(api.img + selected);

      // console.log('data', data);
      
      // const shareOptions = {
      //   title: route.params.title,
      //   message: 'Share Media',
      //   url: 'data:image/png;base64,' + data,
      //   social: Share.Social.FACEBOOK,
      // };
      // Share.shareSingle(shareOptions);
    } catch (error) {
      console.log("error", error);
    }
    
  };

  const handleFavourite = async imageId => {
    try {
      const savedItem = await axios.put(
        api.savedItem,
        {
          type: 'media',
          value: imageId,
        },
        {
          headers: {
            'x-auth-token': account.token,
            publicToken
          },
        },
      );

      const savedEvents = savedItem.data.content ? savedItem.data.content : [];
      await AsyncStorage.setItem('media', JSON.stringify(savedEvents));
      // console.log('savedItem.data.content', savedEvents);
      setSavedMedia(savedEvents);
    } catch (error) {
      console.log('error', error);
      console.log('error.response', error.response);
    }
  };

  return (
    <ThemeContext.Consumer>
      {({theme, baseColor}) => (
        <View style={[classes.root, {backgroundColor: theme.background}]}>
          <View style={classes.iconBack}>
            <IconButton
              icon="arrow-back"
              color="white"
              onPress={() => goBack()}
            />
          </View>
          <View style={classes.body}>
            {typeof index[0] !== 'undefined' && (
              <GallerySwiper
                images={img}
                initialNumToRender={index.length}
                initialPage={Number(index.indexOf(selected))}
              />
            )}
          </View>

          {/* <View style={classes.iconRoot}>
            <TouchableOpacity
              style={{backgroundColor: baseColor, borderRadius: 50}}
              onPress={FacebookShare}>
              <Image
                source={require('../assets/icons/facebook.png')}
                style={{width: 35, height: 35}}
              />
            </TouchableOpacity>

            {account.token && (
              <IconButton
                icon={'favorite-border'}
                size={30}
                onPress={() => handleFavourite(imageId)}
                style={classes.icons}
                // color={baseColor}
                color={savedMedia.includes(imageId) ? baseColor : 'white'}
              />
            )}
            <TouchableOpacity
              style={{backgroundColor: baseColor, borderRadius: 50}}
              onPress={InstagramShare}>
              <Image
                source={require('../assets/icons/instagram.png')}
                style={{width: 35, height: 35}}
              />
            </TouchableOpacity>
          </View> */}
        </View>
      )}
    </ThemeContext.Consumer>
  );
};

export default MediaPictureDetail;

const classes = StyleSheet.create({
  root: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // marginTop: 100,
  },
  iconBack: {
    // flex: 0.5,
    paddingTop: 30,
    width: "100%",
    alignItems: "flex-start",
    backgroundColor: 'black',
  },
  body: {
    flex: 1
  },
  iconRoot: {
    // flex: 0.5,
    backgroundColor: 'black',
    width: '100%',
    paddingHorizontal: 15,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});










  // const InstagramShare = async () => {
    // const {item} = this.state;

    // const shareOptions = {
    //   title: 'Share image to instastory',
    //   method: Share.InstagramStories.SHARE_BACKGROUND_IMAGE,
    //   backgroundImage: images.image1,
    //   social: Share.Social.INSTAGRAM_STORIES,
    // };

    // try {
    //   const ShareResponse = await Share.shareSingle(shareOptions);
    //   console.log(
    //     'JSON.stringify(ShareResponse, null, 2)',
    //     JSON.stringify(ShareResponse, null, 2),
    //   );
    //   // setResult(JSON.stringify(ShareResponse, null, 2));
    // } catch (error) {
    //   console.log('Error =>', error);
    //   // setResult('error: '.concat(getErrorString(error)));
    // }

    // const url = images.image1;
    // const title = 'Awesome Contents';
    // const message = 'Please check this out.';
    // const options = Platform.select({
    //   ios: {
    //     activityItemSources: [
    //       {
    //         placeholderItem: {type: 'url', content: url},
    //         item: {
    //           default: {type: 'url', content: url},
    //         },
    //         subject: {
    //           default: title,
    //         },
    //         linkMetadata: {originalUrl: url, url, title},
    //       },
    //       {
    //         placeholderItem: {type: 'text', content: message},
    //         item: {
    //           default: {type: 'text', content: message},
    //           message: null, // Specify no text to share via Messages app.
    //         },
    //       },
    //     ],
    //   },
    //   default: {
    //     title,
    //     subject: title,
    //     message: `${message} ${url}`,
    //   },
    // });

    // Share.open(options);

  //   const shareOptions = {
  //     method: Share.InstagramStories.SHARE_BACKGROUND_AND_STICKER_IMAGE,
  //     backgroundImage: 'http://urlto.png',
  //     stickerImage: images.image1, //or you can use "data:" link
  //     backgroundBottomColor: '#fefefe',
  //     backgroundTopColor: '#906df4',
  //     social: Share.Social.INSTAGRAM_STORIES,
  //   };
  //   Share.shareSingle(shareOptions);
  // };