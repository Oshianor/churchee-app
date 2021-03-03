import React, {Component} from 'react';
import {
  Surface,
  Caption,
  IconButton,
  Subheading,
  Colors,
  Button,
  Paragraph,
  Avatar,
  Title,
} from 'react-native-paper';
import {
  View,
  StyleSheet,
  ScrollView,
  Share,
  Dimensions,
  Image
} from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {api, publicToken} from '../../../../api';
import {Youtube, AudioPlayer} from '../../../../components/Random';
import Wrapper from '../../../../components/Background';
import {ThemeContext} from '../../../../context/ThemeContext';
const screen = Dimensions.get('screen');


const SermonDetail = ({ route, navigation: { navigate } }) => {
  const [paused, setPaused] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const { fontSize } = React.useContext(ThemeContext); 
  const {title, body, audio, video, headline, img, youtubeId} = route.params;

  const fslg = {
    fontSize: fontSize + 5,
    paddingVertical: 5,
  };
  const fsmd = {
    fontSize: fontSize + 2,
    paddingVertical: 5,
  };
  const fssm = {
    fontSize: fontSize,
    paddingVertical: 5,
  };

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

  const handleToggle = () => {
    setOpen(!open)
  } 

  return (
    <ThemeContext.Consumer>
      {({theme, baseColor}) => (
        <View style={[classes.root, {backgroundColor: theme.background}]}>
          {youtubeId ? (
            <Youtube videoId={youtubeId} />
          ) : (
            <Image source={{uri: api.img + img}} style={classes.img} />
          )}

          <Wrapper>
            <ScrollView contentContainerStyle={classes.body}>
              <Title style={fslg}>{title}</Title>
              <Paragraph style={fssm}>{headline}</Paragraph>
              <View style={classes.icons}>
                <Icon
                  style={classes.icon}
                  color={theme.icon}
                  onPress={onShare}
                  name="share-variant"
                  size={25}
                />

                {audio && (
                  <Button
                    mode="outlined"
                    // onPress={() =>
                    //   this.setState(state => ({ paused: !state.paused }))
                    // }
                    onPress={handleToggle}>
                    {/* {!paused ? 'Click to Stop audio' : 'Listen to Audio'} */}
                    Listen to Audio
                  </Button>
                )}

                {video && (
                  <Button
                    mode="outlined"
                    icon="television"
                    onPress={() =>
                      navigate('VideoPlayerScreen', {
                        video: video,
                        title: title,
                        route: 'SermonDetailScreen',
                      })
                    }
                    // onPress={this.handleVideo}
                  >
                    Watch
                  </Button>
                )}

                <View style={classes.flex} />
              </View>
              {body !== '' && (
                <>
                  <Subheading style={[classes.message, fsmd]}>
                    Message Transparent
                  </Subheading>
                  <Paragraph style={fssm}>{body}</Paragraph>
                </>
              )}
            </ScrollView>
            <AudioPlayer
              item={route.params}
              open={open}
              handleClose={handleToggle}
            />
          </Wrapper>
        </View>
      )}
    </ThemeContext.Consumer>
  );
}

export default SermonDetail;

const classes = StyleSheet.create({
  root: {
    flex: 1,
  },
  body: {
    paddingHorizontal: 10,
  },
  icons: {
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
  },
  icon: {
    padding: 15,
  },
  message: {
    fontWeight: '500',
  },
  flex: {flexGrow: 1},
  headerRight: {
    flex: 1,
    justifyContent: 'flex-end',
    marginHorizontal: 15,
    alignItems: 'center',
    flexDirection: 'row',
  },
  subheading: {
    paddingTop: 15,
    fontSize: 15,
    textAlign: 'left',
  },
  paragraph: {
    fontSize: 15,
    textAlign: 'left',
  },
  heading: {
    fontSize: 15,
    textAlign: 'center',
  },
  chorus: {
    fontStyle: 'italic',
    // color: "g"
  },
  title: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  img: {
    width: screen.width,
    height: screen.height / 3.5,
  },
  imgBack: {
    width: screen.width,
    height: screen.height / 3.5,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonStop: {
    fontSize: 16,
    color: 'white',
    backgroundColor: 'rgba(80,00,00,1)',
    borderWidth: 1,
    borderColor: 'rgba(80,80,80,0.5)',
    overflow: 'hidden',
    paddingHorizontal: 15,
    paddingVertical: 7,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
  },
  rail: {
    width: 100,
    height: 5,
    marginLeft: 5,
    backgroundColor: '#2C2C2C',
  },
});
