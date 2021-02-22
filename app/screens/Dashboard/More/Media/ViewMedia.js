import React from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import axios from 'axios';
import {api, publicToken } from '../../../../api';
import Icon from "react-native-vector-icons/MaterialIcons";
import {ThemeContext} from '../../../../context/ThemeContext';
const { width, height } = Dimensions.get('screen');


const MediaDetails = ({ navigation, route }) => {
  const [loading, setLoading] = React.useState(false);
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [content, setContent] = React.useState([]);
  const [img, setImg] = React.useState([]);
  const [index, setIndex] = React.useState([]);

  console.log("route", route);
  console.log("content", content);
  

  React.useEffect(() => {
    handleData();
  }, []);


  const handleData = async () => {
    try {
      setLoading(true);

      const mediaLoad = await axios.get(api.media + "/" + route.params._id, { headers: { publicToken } });

      console.log('mediaLoad', mediaLoad);

      const newData = [];
      const tracker = [];

      mediaLoad.data.media.forEach((element, index) => {
        if (element.type === 'image') {
          newData.push({ uri: api.img + element.img });
          tracker.push(element.img);
        }
      });

      setLoading(false);
      setContent(mediaLoad.data.media);
      setImg(newData)
      setIndex(tracker)
    } catch (error) {
      console.log(error);
      setLoading(false);
      console.log(error.response);
    }
  };


  const handleRefreshData = async () => {
    try {
      setIsRefreshing(true);
      // setMediaPage(1);

      const mediaLoad = await axios.get(api.media + "/" + route.params._id, { headers: { publicToken } });

      console.log('mediaLoad', mediaLoad);

      const newData = [];
      const tracker = [];

      mediaLoad.data.media.forEach((element, index) => {
        if (element.type === 'image') {
          newData.push({ uri: api.img + element.img });
          tracker.push(element.img);
        }
      });

      setLoading(false);
      setContent(mediaLoad.data.media);
      setImg(newData)
      setIndex(tracker)
      setIsRefreshing(false);
    } catch (error) {
      console.log(error);
      setIsRefreshing(false);
      console.log(error.response);
    }
  };


  const renderFooter = () => {
    if (!loading) return null;
    return <ActivityIndicator style={{ color: '#000' }} />;
  };

  return (
    <ThemeContext.Consumer>
      {({theme, baseColor}) => (
    <View style={[classes.root, {backgroundColor: theme.background}]}>
      <FlatList
        data={content}
        keyExtractor={item => item._id}
        numColumns={2} refreshing={isRefreshing}
        ListFooterComponent={renderFooter.bind(this)}
        onRefresh={handleRefreshData}
        columnWrapperStyle={classes.contain}
        renderItem={({item}) => (
          <View style={classes.container}>
            {item.type === 'video' ? (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('MediaVideoDetailScreen', {
                    video: item.videoUrl,
                    title: content.name,
                  })
                }>
                <ImageBackground
                  style={[classes.img, classes.body]}
                  source={{uri: api.img + item.img}}>
                  <Icon
                    name="play-circle-outline"
                    size={40}
                    style={classes.icon}
                  />
                </ImageBackground>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('MediaPictureDetailScreen', {
                    title: content.name,
                    img,
                    index,
                    selected: item.imgObj.key,
                    imageId: item._id
                  })
                }>
                <Image
                  source={{uri: api.img + item.img}}
                  style={classes.img}
                />
              </TouchableOpacity>
            )}
          </View>
        )}
      />
    </View>
    )}
    </ThemeContext.Consumer>
  );
}

export default MediaDetails;

const classes = StyleSheet.create({
  root: {
    flex: 1,
    paddingVertical: 10,
    // paddingHorizontal: 10,
  },
  container: {
    marginVertical: 5
  },
  headerRight: {
    flex: 1,
    justifyContent: 'flex-end',
    marginHorizontal: 15,
    alignItems: 'center',
    flexDirection: 'row',
  },
  surface: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    elevation: 4,
  },
  left: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  bibleTypeFontSize: {
    fontSize: 15,
    color: '#4cd964',
  },
  icon: {
    marginRight: 20,
  },
  Subheading: {
    fontSize: 18,
  },
  title: {flex: 1, justifyContent: 'flex-start'},
  section: {
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    // flex: 1
  },
  img: {
    height: height / 5,
    width: width / 2.05,
  },
  body: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contain: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
});
